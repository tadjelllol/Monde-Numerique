'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Search } from 'lucide-react'

export default function FootprintPage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<{
    score: number;
    issues: string[];
    recommendations: string[];
  } | null>(null)

  const analyzeFootprint = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setResults({
        score: 75,
        issues: [
          "Plusieurs publications contiennent des mots négatifs",
          "Certains commentaires pourraient être considérés comme inappropriés",
          "Partage occasionnel d'informations personnelles sensibles"
        ],
        recommendations: [
          "Révise tes anciens posts et supprime ceux qui pourraient être problématiques",
          "Utilise un ton plus positif dans tes futures publications",
          "Évite de partager des informations personnelles sensibles"
        ]
      })
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Analyse ton Empreinte Numérique</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={analyzeFootprint} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nom d'utilisateur sur les réseaux sociaux</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="@username"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg"
                placeholder="ton@email.com"
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

          {results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 space-y-6"
            >
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{results.score}/100</div>
                <p className="text-gray-600">Score de ton empreinte numérique</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="text-yellow-500" />
                  Points à améliorer
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
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

