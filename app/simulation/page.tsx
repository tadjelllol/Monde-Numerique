'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Heart, Share, MoreHorizontal } from 'lucide-react'
import { generateMistralResponse } from '../utils/mistralInterface'

async function generateAIResponse(tweet: string) {
  const prompt = `Analysez le tweet suivant et fournissez une réponse comme si vous étiez un modérateur IA. Incluez les conséquences potentielles avec des exemples si le tweet est inapproprié. Répondez en français.

Tweet: "${tweet}"

Réponse:`;

  return await generateMistralResponse(prompt);
}

export default function SimulationPage() {
  const [tweets, setTweets] = useState<Array<{
    id: number;
    content: string;
    timestamp: string;
    likes: number;
    reponses: number;
    partages: number;
    isAIResponse?: boolean;
  }>>([])
  const [tweetContent, setTweetContent] = useState('')
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
      partages: 0
    }

    setTweets(prev => [newTweet, ...prev])
    setTweetContent('')

    try {
      const aiResponse = await generateAIResponse(tweetContent)
      const aiTweet = {
        id: Date.now() + 1,
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString(),
        likes: 0,
        reponses: 0,
        partages: 0,
        isAIResponse: true
      }
      setTweets(prev => [aiTweet, ...prev])
    } catch (error) {
      console.error('Erreur lors de la génération de la réponse IA:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Simulation X/Twitter</h1>
          <p className="text-sm text-gray-600">Apprenez les conséquences de vos publications</p>
        </div>

        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <textarea
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
                placeholder="Quoi de neuf ?"
                className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleTweet}
                  disabled={isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Publication en cours...' : 'Publier'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {tweets.map((tweet) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                tweet.isAIResponse ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">
                      {tweet.isAIResponse ? 'Modérateur IA' : 'Vous'}
                    </span>
                    <span className="text-gray-500">· {tweet.timestamp}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap">{tweet.content}</p>
                  <div className="flex gap-6 mt-4 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-blue-500">
                      <MessageCircle size={18} />
                      <span>{tweet.reponses}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-pink-500">
                      <Heart size={18} />
                      <span>{tweet.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-500">
                      <Share size={18} />
                      <span>{tweet.partages}</span>
                    </button>
                    <button className="hover:text-blue-500">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

