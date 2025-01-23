"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, Search, ExternalLink } from "lucide-react"

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
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Analysez Votre Empreinte Numérique
        </motion.h1>

        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg border border-purple-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-purple-900">Nom complet</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Entrez un nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={analyzing}
              className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {analyzing ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyse en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Search size={20} className="mr-2" />
                  Analyser mon empreinte
                </span>
              )}
            </motion.button>
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
                transition={{ duration: 0.5 }}
                className="mt-8 space-y-6"
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-6xl font-bold mb-2 gradient-text">{results.score}/100</div>
                  <p className="text-gray-600">Votre score d'empreinte numérique</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-purple-900">
                    <AlertTriangle className="text-yellow-500" />
                    Points d'attention
                  </h2>
                  <ul className="space-y-2">
                    {results.issues.map((issue, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <span className="text-red-500">•</span>
                        {issue}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-purple-900">
                    <CheckCircle className="text-green-500" />
                    Recommandations
                  </h2>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <span className="text-green-500">•</span>
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <h2 className="text-xl font-semibold mb-3 text-purple-900">Références trouvées</h2>
                  <div className="space-y-4">
                    {results.references.map((ref, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className={`border rounded-lg p-4 ${
                          ref.sentiment === "positive"
                            ? "bg-green-50 border-green-200"
                            : ref.sentiment === "negative"
                              ? "bg-red-50 border-red-200"
                              : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className="font-semibold mb-2 text-purple-900">{ref.source}</div>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline mb-2 flex items-center gap-1"
                        >
                          {ref.title}
                          <ExternalLink size={14} />
                        </a>
                        <p className="text-sm text-gray-600 mb-2">{ref.content}</p>
                        <p className="text-sm font-semibold text-purple-900">
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
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

