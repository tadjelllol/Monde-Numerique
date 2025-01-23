"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { generateMistralResponse } from "@/app/utils/mistralInterface"

export function AIChatPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const aiResponse = await generateMistralResponse(input)
      setMessages((prev) => [...prev, { role: "ai", content: aiResponse }])
    } catch (error) {
      console.error("Erreur lors de la génération de la réponse :", error)
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Chat IA</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-purple-200">
                <X size={20} />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Send size={20} />
                    </motion.div>
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

