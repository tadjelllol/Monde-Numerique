"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

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
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mèmes sur la Littératie Numérique
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {memes.map((meme, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMeme(meme.src)}
          >
            <Image
              src={meme.src || "/placeholder.svg"}
              alt={meme.alt}
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        ))}
      </div>
      {selectedMeme && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMeme(null)}
        >
          <motion.div className="relative" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}>
            <Image
              src={selectedMeme || "/placeholder.svg"}
              alt="Mème agrandi"
              width={800}
              height={800}
              className="rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

