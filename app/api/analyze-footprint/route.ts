import { NextResponse } from "next/server"
import { generateMistralResponse } from "@/app/utils/mistralInterface"

type SearchResult = {
  title: string
  url: string
  content: string
  source: string
}

type AnalyzedReference = SearchResult & {
  sentiment: "positive" | "negative" | "neutral"
}

// Simulated search function
async function simulateSearch(name: string): Promise<SearchResult[]> {
  // This is a mock function. In a real-world scenario, you'd implement actual web scraping or use a search API.
  const mockResults: SearchResult[] = [
    {
      title: `${name} on LinkedIn`,
      url: `https://www.linkedin.com/in/${name.toLowerCase().replace(" ", "-")}`,
      content: `${name} is a software engineer with 5 years of experience in web development.`,
      source: "LinkedIn",
    },
    {
      title: `${name} (@${name.toLowerCase().replace(" ", "")}) on Twitter`,
      url: `https://twitter.com/${name.toLowerCase().replace(" ", "")}`,
      content: `Passionate about technology and innovation. Views are my own.`,
      source: "Twitter/X",
    },
    {
      title: `${name}'s GitHub Profile`,
      url: `https://github.com/${name.toLowerCase().replace(" ", "")}`,
      content: `Open source contributor and creator of various web development projects.`,
      source: "GitHub",
    },
    {
      title: `${name} - Medium`,
      url: `https://medium.com/@${name.toLowerCase().replace(" ", "")}`,
      content: `Tech blogger sharing insights on the latest web technologies and best practices.`,
      source: "Medium",
    },
  ]

  return mockResults
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

export async function POST(req: Request) {
  try {
    const { name } = await req.json()

    // Simulate search results
    const searchResults = await simulateSearch(name)

    // Analyze each result
    const references: AnalyzedReference[] = await Promise.all(
      searchResults.map(async (result) => ({
        ...result,
        sentiment: await analyzeSentiment(result.content),
      })),
    )

    // Generate overall analysis
    const analysisPrompt = `Analysez l'empreinte numérique de "${name}" basée sur les résultats suivants. Fournissez un score sur 100, une liste de problèmes potentiels et des recommandations. Répondez en français.

Résultats:
${references.map((ref) => `${ref.source}: ${ref.content}`).join("\n\n")}

Analyse:`

    const analysis = await generateMistralResponse(analysisPrompt)

    // Parse the analysis
    const score = Number.parseInt(analysis.match(/Score: (\d+)/)?.[1] || "75")
    const issues =
      analysis
        .match(/Problèmes:([\s\S]*?)Recommandations:/)?.[1]
        ?.trim()
        .split("\n")
        .filter(Boolean) || []
    const recommendations =
      analysis
        .match(/Recommandations:([\s\S]*?)$/)?.[1]
        ?.trim()
        .split("\n")
        .filter(Boolean) || []

    return NextResponse.json({
      score,
      issues,
      recommendations,
      references,
    })
  } catch (error) {
    console.error("Error in footprint analysis:", error)
    return NextResponse.json({ error: "Une erreur s'est produite lors de l'analyse." }, { status: 500 })
  }
}

