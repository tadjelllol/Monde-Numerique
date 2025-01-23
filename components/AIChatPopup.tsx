"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"
import { generateWebsiteContentResponse } from "@/app/utils/websiteContentAI"
import { ClientSideAnimation } from "./ClientSideAnimation"

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
      const aiResponse = await generateWebsiteContentResponse(input)
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
      <ClientSideAnimation>
        <button
          className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      </ClientSideAnimation>

      <AnimatePresence>
        {isOpen && (
          <ClientSideAnimation>
            <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-purple-100">
              <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-semibold">Chat IA</h3>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-purple-200 transition-colors">
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
              <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-purple-100">
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
                    className="bg-gradient-to-r from-purple-600 to-teal-600 text-white p-2 rounded-r-lg hover:shadow-md transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ClientSideAnimation>
                        <Send size={20} className="animate-spin" />
                      </ClientSideAnimation>
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </ClientSideAnimation>
        )}
      </AnimatePresence>
    </>
  )
}

