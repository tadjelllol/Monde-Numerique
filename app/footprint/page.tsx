"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, Search } from "lucide-react"

type AnalysisResult = {
  score: number
  issues: string[]
  recommendations: string[]
  references: {
    title: string
    url: string
    content: string
    source: string
    sentiment: "positive" | "negative" | "neutral"
  }[]
}

export default function FootprintPage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [name, setName] = useState("")
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-footprint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze footprint")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError("Une erreur s'est produite lors de l'analyse. Veuillez réessayer.")
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Analysez Votre Empreinte Numérique</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom complet</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="Entrez un nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Analyser mon empreinte
                </>
              )}
            </button>
          </form>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 space-y-6"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{results.score}/100</div>
                  <p className="text-gray-600">Votre score d'empreinte numérique</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500" />
                    Points d'attention
                  </h2>
                  <ul className="space-y-2">
                    {results.issues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="text-green-500" />
                    Recommandations
                  </h2>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Références trouvées</h2>
                  <div className="space-y-4">
                    {results.references.map((ref, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-lg p-4 ${
                          ref.sentiment === "positive"
                            ? "bg-green-50 border-green-200"
                            : ref.sentiment === "negative"
                              ? "bg-red-50 border-red-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="font-semibold mb-2">{ref.source}</div>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline mb-2 block"
                        >
                          {ref.title}
                        </a>
                        <p
                          className={`${
                            ref.sentiment === "positive"
                              ? "text-green-800"
                              : ref.sentiment === "negative"
                                ? "text-red-800"
                                : "text-gray-800"
                          } mb-2`}
                        >
                          {ref.content}
                        </p>
                        <p className="text-sm font-semibold">
                          Sentiment:{" "}
                          {ref.sentiment === "positive"
                            ? "Positif"
                            : ref.sentiment === "negative"
                              ? "Négatif"
                              : "Neutre"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

