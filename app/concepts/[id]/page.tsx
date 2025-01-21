"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { generateMistralResponse } from "@/app/utils/mistralInterface"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont en réseau",
    content:
      "Dans l'ère numérique, l'information circule instantanément à l'échelle mondiale. Vos publications peuvent atteindre un public bien au-delà de votre cercle immédiat, créant des opportunités mais aussi des défis en termes de gestion de votre présence en ligne.",
    example: "Une vidéo de chat postée à Paris peut devenir virale au Japon en quelques heures.",
    image: "/images/networked-media.jpg",
  },
  {
    id: 2,
    title: "Les médias numériques ont des auditoires imprévus",
    content:
      "Le contrôle sur qui voit vos publications en ligne est souvent limité. Le contenu peut être partagé ou redistribué de manières inattendues, atteignant des personnes que vous n'aviez pas envisagées comme public.",
    example: "Une blague sur votre compte privé pourrait être vue par vos futurs employeurs si un ami la partage.",
    image: "/images/unexpected-audience.jpg",
  },
  {
    id: 3,
    title: "Les médias numériques sont partageables et continus",
    content:
      "Une fois publiée, une information peut persister indéfiniment en ligne. Même si vous supprimez le contenu original, des copies peuvent exister ailleurs. Cette permanence peut avoir des conséquences à long terme sur votre réputation.",
    example: "Une photo embarrassante supprimée après quelques minutes pourrait réapparaître des années plus tard.",
    image: "/images/shareable-persistent.jpg",
  },
  {
    id: 4,
    title: "Nos interactions peuvent avoir un impact réel",
    content:
      "Les actions en ligne ne sont pas isolées du monde réel. Elles peuvent avoir des conséquences tangibles sur nos vies et celles des autres. Un commentaire peut influencer l'estime de soi de quelqu'un, tandis que des actions collectives en ligne peuvent influencer des mouvements sociaux.",
    example:
      "Un commentaire encourageant sur une vidéo musicale pourrait inspirer quelqu'un à poursuivre une carrière artistique.",
    image: "/images/real-impact.jpg",
  },
  {
    id: 5,
    title: "Notre expérience est façonnée par les outils numériques",
    content:
      "Les algorithmes et la personnalisation jouent un rôle crucial dans notre expérience en ligne. Ils déterminent ce que nous voyons sur les réseaux sociaux, les moteurs de recherche et les plateformes de streaming, créant potentiellement des 'bulles de filtre'.",
    example:
      "Si vous regardez beaucoup de vidéos sur les chats, YouTube vous suggérera de plus en plus de contenus liés aux chats.",
    image: "/images/digital-shaping.jpg",
  },
]

export default function ConceptPage({ params }: { params: { id: string } }) {
  const concept = concepts.find((c) => c.id === Number.parseInt(params.id))
  const [generatedExample, setGeneratedExample] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  if (!concept) {
    notFound()
  }

  const generateExample = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Générez un exemple court et concret (max 50 mots) pour illustrer le concept suivant du monde numérique : "${concept.title}". L'exemple doit être adapté à un public adolescent et doit clairement démontrer l'importance et l'application pratique de ce concept dans leur vie quotidienne. Répondez en français.`
      const response = await generateMistralResponse(prompt)
      setGeneratedExample(response)
    } catch (error) {
      console.error("Erreur lors de la génération de l'exemple :", error)
      setGeneratedExample(
        "Désolé, une erreur s'est produite lors de la génération de l'exemple. Veuillez réessayer plus tard.",
      )
    }
    setIsGenerating(false)
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        {concept.title}
      </motion.h1>
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="relative w-full h-64 mb-6 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image src={concept.image || "/placeholder.svg"} alt={concept.title} layout="fill" objectFit="cover" />
        </motion.div>
        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {concept.content}
        </motion.p>
        <motion.h2
          className="text-2xl font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Exemple :
        </motion.h2>
        <motion.p
          className="text-lg italic mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {concept.example}
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={generateExample}
            disabled={isGenerating}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? "Génération en cours..." : "Générer un nouvel exemple"}
          </motion.button>
          {generatedExample && (
            <motion.div
              className="mt-4 p-4 bg-gray-100 rounded-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Exemple généré :</h3>
              <p>{generatedExample}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

