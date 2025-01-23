"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Heart, Share, MoreHorizontal } from "lucide-react"
import { generateMistralResponse } from "../utils/mistralInterface"

async function generateAIResponse(tweet: string) {
  const prompt = `Analysez le tweet suivant et fournissez une réponse comme si vous étiez un modérateur IA. Incluez les conséquences potentielles avec des exemples si le tweet est inapproprié. Répondez en français.

Tweet: "${tweet}"

Réponse:`

  return await generateMistralResponse(prompt)
}

export default function SimulationPage() {
  const [tweets, setTweets] = useState<
    Array<{
      id: number
      content: string
      timestamp: string
      likes: number
      reponses: number
      partages: number
      isAIResponse?: boolean
    }>
  >([])
  const [tweetContent, setTweetContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTweet = async () => {
    if (!tweetContent.trim() || isLoading) return

    setIsLoading(true)

    const newTweet = {
      id: Date.now(),
      content: tweetContent,
      timestamp: new Date().toLocaleTimeString(),
      likes: 0,
      reponses: 0,
      partages: 0,
    }

    setTweets((prev) => [newTweet, ...prev])
    setTweetContent("")

    try {
      const aiResponse = await generateAIResponse(tweetContent)
      const aiTweet = {
        id: Date.now() + 1,
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        likes: 0,
        reponses: 0,
        partages: 0,
        isAIResponse: true,
      }
      setTweets((prev) => [aiTweet, ...prev])
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse IA:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-2xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Simulation X/Twitter
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100"
        >
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-purple-900">Nouvelle Publication</h2>
            <p className="text-sm text-gray-600">Apprenez les conséquences de vos publications</p>
          </div>

          <div className="p-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-teal-400"></div>
              <div className="flex-1">
                <textarea
                  value={tweetContent}
                  onChange={(e) => setTweetContent(e.target.value)}
                  placeholder="Quoi de neuf ?"
                  className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <motion.button
                    onClick={handleTweet}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLoading ? "Publication en cours..." : "Publier"}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <AnimatePresence>
              {tweets.map((tweet) => (
                <motion.div
                  key={tweet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    tweet.isAIResponse ? "bg-gradient-to-r from-purple-50 to-teal-50" : ""
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-teal-400"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-purple-900">
                          {tweet.isAIResponse ? "Modérateur IA" : "Vous"}
                        </span>
                        <span className="text-gray-500">· {tweet.timestamp}</span>
                      </div>
                      <p className="mt-2 text-gray-800 whitespace-pre-wrap">{tweet.content}</p>
                      <div className="flex gap-6 mt-4 text-gray-500">
                        <button className="flex items-center gap-2 hover:text-purple-500 transition-colors">
                          <MessageCircle size={18} />
                          <span>{tweet.reponses}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                          <Heart size={18} />
                          <span>{tweet.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-teal-500 transition-colors">
                          <Share size={18} />
                          <span>{tweet.partages}</span>
                        </button>
                        <button className="hover:text-purple-500 transition-colors">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

