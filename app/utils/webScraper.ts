import { generateMistralResponse } from "./mistralInterface"
import axios from "axios"
import * as cheerio from 'cheerio';


async function searchWeb(query: string): Promise<string[]> {
  // This is a simplified version. In a real-world scenario, you'd use a proper search API.
  const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(query)}`)
  const $ = cheerio.load(response.data)
  const results: string[] = []

  $("div.g").each((i, element) => {
    const title = $(element).find("h3.r").text()
    const link = $(element).find("div.r a").attr("href")
    const snippet = $(element).find("div.s").text()
    if (title && link && snippet) {
      results.push(`${title}\n${link}\n${snippet}`)
    }
  })

  return results.slice(0, 5) // Limit to first 5 results
}

async function analyzeSentiment(text: string): Promise<"positive" | "negative" | "neutral"> {
  const prompt = `Analysez le sentiment du texte suivant et répondez uniquement par "positif", "négatif" ou "neutre":

"${text}"

Sentiment:`

  const response = await generateMistralResponse(prompt)
  if (response.toLowerCase().includes("positif")) return "positive"
  if (response.toLowerCase().includes("négatif")) return "negative"
  return "neutral"
}

export async function analyzeDigitalFootprint(name: string) {
  const searchResults = await searchWeb(name)

  const analysisPrompt = `Analysez l'empreinte numérique de "${name}" basée sur les résultats de recherche suivants. Fournissez un score sur 100, une liste de problèmes potentiels et des recommandations. Répondez en français.

Résultats de recherche:
${searchResults.join("\n\n")}

Analyse:`

  const analysis = await generateMistralResponse(analysisPrompt)

  // Parse the analysis
  const score = Number.parseInt(analysis.match(/Score: (\d+)/)?.[1] || "0")
  const issues =
    analysis
      .match(/Problèmes:([\s\S]*?)Recommandations:/)?.[1]
      .trim()
      .split("\n") || []
  const recommendations =
    analysis
      .match(/Recommandations:([\s\S]*?)$/)?.[1]
      .trim()
      .split("\n") || []

  // Analyze sentiment for each search result
  const references = await Promise.all(
    searchResults.map(async (result) => {
      const [title, url, content] = result.split("\n")
      const sentiment = await analyzeSentiment(content)
      return { url, content, sentiment }
    }),
  )

  return { score, issues, recommendations, references }
}

