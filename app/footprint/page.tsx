'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Search } from 'lucide-react'
import { simulateWebScrape, analyzeContent } from '../utils/webScraper'

type AnalysisResult = {
  score: number
  issues: string[]
  recommendations: string[]
  flaggedPosts: string[]
}

export default function FootprintPage() {
  const [analyzing, setAnalyzing] = useState(false)
  const [username, setUsername] = useState('')
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnalyzing(true)
    setError(null)

    try {
      const posts = await simulateWebScrape(username)
      const analysis = await analyzeContent(posts)
      setResults(analysis)
    } catch (err) {
      setError('An error occurred during the analysis. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Analyze Your Digital Footprint</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Social Media Username</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                  Analyzing...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Analyze my footprint
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
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 space-y-6"
              >
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{results.score}/100</div>
                  <p className="text-gray-600">Your digital footprint score</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500" />
                    Areas of Concern
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
                    Recommendations
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
                  <h2 className="text-xl font-semibold mb-3">Flagged Posts</h2>
                  <div className="space-y-4">
                    {results.flaggedPosts.map((post, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        <p className="text-red-800 mb-2">{post}</p>
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

