"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { generateMistralResponse } from "@/app/utils/mistralInterface"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont connectés partout",
    content:
      "Dans le monde numérique, les infos voyagent super vite, parfois à l'autre bout du globe. Ce que tu postes peut toucher bien plus de gens que tu ne l'imagines. Ça peut être génial pour partager des idées, mais ça peut aussi être compliqué si tu perds le contrôle de ce que tu publies.",
    example: "Une vidéo marrante de ton chat postée à Paris peut devenir virale au Japon en quelques heures.",
    image: "/images/concepts/connected-media.gif",
  },
  {
    id: 2,
    title: "Les médias numériques touchent des gens inattendus",
    content:
      "Quand tu publies quelque chose en ligne, tu ne peux pas toujours décider qui va le voir. Une fois partagé, ton contenu peut atteindre des gens que tu n'avais pas prévus, et ça peut créer des surprises… pas toujours agréables.",
    example: "Une blague sur ton compte privé pourrait être vue par un futur employeur si quelqu'un la partage.",
    image: "/images/concepts/unexpected-audience.gif",
  },
  {
    id: 3,
    title: "Les médias numériques durent et se partagent facilement",
    content:
      "Ce que tu postes en ligne peut rester là pour toujours, même si tu l'effaces. Des copies peuvent circuler ailleurs. C'est pour ça qu'il faut bien réfléchir avant de publier quelque chose, parce que ça pourrait revenir te poser problème plus tard.",
    example: "Une photo gênante supprimée après quelques minutes pourrait réapparaître des années plus tard.",
    image: "/images/concepts/persistent-media.gif",
  },
  {
    id: 4,
    title: "Ce qu'on fait en ligne a des conséquences dans la vraie vie",
    content:
      "Ce que tu dis ou fais sur Internet peut avoir un vrai impact. Ça peut être positif, comme inspirer quelqu'un ou participer à un mouvement important. Mais ça peut aussi être négatif, comme blesser quelqu'un avec un commentaire méchant.",
    example: "Un message sympa sur une vidéo musicale pourrait motiver quelqu'un à devenir artiste.",
    image: "/images/concepts/real-life-impact.jpg",
  },
  {
    id: 5,
    title: "Les outils numériques influencent ce qu'on voit",
    content:
      "Les réseaux sociaux et les applications vous montrent principalement ce qu'ils pensent que vous aimez. C'est utile, mais cela peut aussi vous enfermer dans une sorte de sphère où vous voyez toujours les mêmes idées. Vous risquez ainsi de manquer des choses importantes ou des points de vue différents. De plus, cela permet aux entreprises de vous cibler plus facilement avec des publicités adaptées à vos goûts, car en réalité, sur les réseaux sociaux, vous êtes le produit, vendu par le biais de la publicité.",
    example: "Si tu regardes plein de vidéos de chats, YouTube va te recommander encore plus de vidéos de chats.",
    image: "/images/concepts/digital-influence.gif",
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
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 gradient-text text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          {concept.title}
        </motion.h1>
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <motion.div className="relative" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <div className="aspect-[16/9] relative">
              <Image
                src={concept.image || "/placeholder.svg"}
                alt={concept.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-teal-500 opacity-20"></div>
          </motion.div>

          <div className="p-8">
            <motion.div
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-gradient-to-r from-purple-50 to-teal-50 p-6 rounded-lg mb-6">
                <p className="text-lg text-gray-800">{concept.content}</p>
              </div>

              <motion.div
                className="bg-gradient-to-r from-teal-50 to-purple-50 p-6 rounded-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-3 text-purple-900">Exemple :</h2>
                <p className="text-lg italic text-gray-800">{concept.example}</p>
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={generateExample}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Génération en cours...
                    </span>
                  ) : (
                    "Générer un nouvel exemple"
                  )}
                </motion.button>

                {generatedExample && (
                  <motion.div
                    className="mt-6 bg-gradient-to-r from-purple-50 to-teal-50 p-6 rounded-lg shadow-inner"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-purple-900">Exemple généré :</h3>
                    <p className="text-gray-800">{generatedExample}</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

