"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const memes = [
  { src: "/images/memes/digital-literacy-meme1.jpg", alt: "Mème sur la littératie numérique 1" },
  { src: "/images/memes/digital-literacy-meme2.jpg", alt: "Mème sur la littératie numérique 2" },
  { src: "/images/memes/digital-literacy-meme3.jpg", alt: "Mème sur la littératie numérique 3" },
  { src: "/images/memes/digital-literacy-meme4.png", alt: "Mème sur la littératie numérique 4" },
  { src: "/images/memes/digital-literacy-meme5.png", alt: "Mème sur la littératie numérique 5" },
  { src: "/images/memes/digital-literacy-meme6.gif", alt: "Mème sur la littératie numérique 6" },
]

export default function MemesPage() {
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null)

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mèmes sur la Littératie Numérique
        </motion.h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {memes.map((meme, index) => (
            <motion.div
              key={index}
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg border border-purple-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMeme(meme.src)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Image
                src={meme.src || "/placeholder.svg"}
                alt={meme.alt}
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedMeme && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMeme(null)}
            >
              <motion.div
                className="relative max-w-3xl max-h-[90vh]"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <Image
                  src={selectedMeme || "/placeholder.svg"}
                  alt="Mème agrandi"
                  width={800}
                  height={800}
                  className="rounded-lg shadow-2xl"
                />
                <motion.button
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedMeme(null)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

