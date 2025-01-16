'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Heart, Share, MoreHorizontal } from 'lucide-react'

const realWorldExamples = [
  {
    trigger: "hate",
    example: {
      case: "En 2021, un étudiant a perdu son admission à l'université après avoir publié des commentaires haineux",
      consequence: "L'université a annulé son admission après que ses tweets sont devenus viraux"
    }
  },
  {
    trigger: "menace",
    example: {
      case: "Une adolescente a eu des problèmes juridiques après avoir menacé son école sur les réseaux sociaux",
      consequence: "Elle a été arrêtée et expulsée de l'école, même si elle disait que c'était 'une blague'"
    }
  },
  // Add more examples
]

const AIResponses = [
  {
    type: "hate",
    responses: [
      "Ce type de message peut être considéré comme de l'incitation à la haine. As-tu pensé aux conséquences légales ?",
      "Publier des messages haineux peut avoir des répercussions sur ton avenir. Voici un exemple réel :"
    ]
  },
  {
    type: "positive",
    responses: [
      "Super message ! C'est ce genre de positivité qui rend Internet meilleur.",
      "Excellent exemple de communication responsable en ligne !"
    ]
  }
]

export default function SimulationPage() {
  const [tweets, setTweets] = useState<Array<{
    id: number;
    content: string;
    timestamp: string;
    likes: number;
    replies: number;
    shares: number;
    isAIResponse?: boolean;
    consequence?: string;
  }>>([])
  const [tweetContent, setTweetContent] = useState('')

  const analyzeTweet = (content: string) => {
    const lowerContent = content.toLowerCase()
    if (lowerContent.includes('kill') || lowerContent.includes('hate') || lowerContent.includes('stupid')) {
      return 'hate'
    }
    return 'positive'
  }

  const getRelevantExample = (type: string) => {
    return realWorldExamples.find(example => example.trigger === type)?.example
  }

  const handleTweet = () => {
    if (!tweetContent.trim()) return

    const tweetType = analyzeTweet(tweetContent)
    const example = getRelevantExample(tweetType)
    const aiResponse = AIResponses.find(response => response.type === tweetType)

    const newTweets = [
      {
        id: Date.now(),
        content: tweetContent,
        timestamp: new Date().toLocaleTimeString(),
        likes: 0,
        replies: 0,
        shares: 0
      }
    ]

    if (aiResponse) {
      newTweets.push({
        id: Date.now() + 1,
        content: aiResponse.responses[Math.floor(Math.random() * aiResponse.responses.length)],
        timestamp: new Date().toLocaleTimeString(),
        likes: 0,
        replies: 0,
        shares: 0,
        isAIResponse: true
      })

      if (example) {
        newTweets.push({
          id: Date.now() + 2,
          content: `${example.case}\n\nConséquence : ${example.consequence}`,
          timestamp: new Date().toLocaleTimeString(),
          likes: 0,
          replies: 0,
          shares: 0,
          isAIResponse: true
        })
      }
    }

    setTweets(prev => [...newTweets, ...prev])
    setTweetContent('')
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
          <p className="text-sm text-gray-600">Apprends les conséquences de tes publications</p>
        </div>

        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1">
              <textarea
                value={tweetContent}
                onChange={(e) => setTweetContent(e.target.value)}
                placeholder="Que veux-tu partager ?"
                className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleTweet}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Publier
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
                      {tweet.isAIResponse ? 'AI Conseiller' : 'Toi'}
                    </span>
                    <span className="text-gray-500">· {tweet.timestamp}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap">{tweet.content}</p>
                  <div className="flex gap-6 mt-4 text-gray-500">
                    <button className="flex items-center gap-2 hover:text-blue-500">
                      <MessageCircle size={18} />
                      <span>{tweet.replies}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-pink-500">
                      <Heart size={18} />
                      <span>{tweet.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-green-500">
                      <Share size={18} />
                      <span>{tweet.shares}</span>
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

