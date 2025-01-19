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

async function simulateSearch(name: string): Promise<SearchResult[]> {
  // In a real-world scenario, this would be replaced with actual web scraping or API calls
  const results: SearchResult[] = []

  // Simulate searching for a LinkedIn profile
  if (Math.random() > 0.7) {
    results.push({
      title: `${name} on LinkedIn`,
      url: `https://www.linkedin.com/in/${name.toLowerCase().replace(" ", "-")}`,
      content: `Professional profile of ${name}. Details may be limited if not publicly accessible.`,
      source: "LinkedIn",
    })
  }

  // Simulate searching for a Twitter/X account
  if (Math.random() > 0.5) {
    results.push({
      title: `${name} on Twitter/X`,
      url: `https://twitter.com/search?q=${encodeURIComponent(name)}`,
      content: `Search results for ${name} on Twitter/X. May include tweets or profile information if available.`,
      source: "Twitter/X",
    })
  }

  // Simulate searching for a GitHub profile
  if (Math.random() > 0.6) {
    results.push({
      title: `GitHub Search for ${name}`,
      url: `https://github.com/search?q=${encodeURIComponent(name)}&type=users`,
      content: `Search results for ${name} on GitHub. May include repositories or profile information if available.`,
      source: "GitHub",
    })
  }

  // Simulate general web search results
  results.push({
    title: `Web Search Results for ${name}`,
    url: `https://www.google.com/search?q=${encodeURIComponent(name)}`,
    content: `General web search results for ${name}. This may include various websites, social media profiles, or news articles mentioning this name.`,
    source: "Web Search",
  })

  return results
}

async function analyzeSentiment(text: string): Promise<"positive" | "negative" | "neutral"> {
  try {
    const prompt = `Analysez le sentiment du texte suivant et répondez uniquement par "positif", "négatif" ou "neutre":

"${text}"

Sentiment:`

    const response = await generateMistralResponse(prompt)
    if (response.toLowerCase().includes("positif")) return "positive"
    if (response.toLowerCase().includes("négatif")) return "negative"
    return "neutral"
  } catch (error) {
    console.error("Error in sentiment analysis:", error)
    return "neutral" // Default to neutral if there's an error
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json()
    console.log("Received request for name:", name)

    // Simulate search results
    const searchResults = await simulateSearch(name)
    console.log("Search results:", searchResults)

    // Analyze each result
    const references = await Promise.all(
      searchResults.map(async (result) => {
        try {
          const sentiment = await analyzeSentiment(result.content)
          return { ...result, sentiment }
        } catch (error) {
          console.error("Error in sentiment analysis:", error)
          return { ...result, sentiment: "neutral" }
        }
      }),
    )
    console.log("Analyzed references:", references)

    // Generate overall analysis
    const analysisPrompt = `Analysez l'empreinte numérique de "${name}" basée sur les résultats suivants. Fournissez un score sur 100, une liste de problèmes potentiels et des recommandations. Si peu d'informations sont trouvées, mentionnez-le et ajustez le score en conséquence. Répondez en français.

Résultats:
${references.map((ref) => `${ref.source}: ${ref.content}`).join("\n\n")}

Analyse:`

    console.log("Sending prompt to Mistral AI:", analysisPrompt)
    let analysis: string
    try {
      analysis = await generateMistralResponse(analysisPrompt)
      console.log("Received analysis from Mistral AI:", analysis)
    } catch (error) {
      console.error("Error generating analysis:", error)
      analysis = `Score: 50

Problèmes:
- Impossible de générer une analyse complète en raison d'une erreur technique.
- Peu d'informations trouvées sur l'empreinte numérique.

Recommandations:
- Vérifiez manuellement votre présence en ligne sur différentes plateformes.
- Considérez créer des profils professionnels si vous souhaitez améliorer votre visibilité en ligne.
- Veuillez réessayer plus tard ou contacter le support technique si le problème persiste.`
    }

    // Parse the analysis
    const score = Number.parseInt(analysis.match(/Score: (\d+)/)?.[1] || "50")
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

    console.log("Parsed analysis:", { score, issues, recommendations })

    return NextResponse.json({
      score,
      issues,
      recommendations,
      references,
    })
  } catch (error) {
    console.error("Error in footprint analysis:", error)
    return NextResponse.json(
      {
        error: "Une erreur s'est produite lors de l'analyse. Veuillez réessayer.",
        score: 50,
        issues: ["Erreur technique lors de l'analyse", "Peu d'informations trouvées sur l'empreinte numérique"],
        recommendations: ["Vérifiez manuellement votre présence en ligne", "Veuillez réessayer plus tard"],
        references: [],
      },
      { status: 500 },
    )
  }
}

