"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { generateMistralResponse } from "@/app/utils/mistralInterface"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont en réseau",
    content:
      "Dans l'ère numérique, l'information circule à une vitesse sans précédent. Lorsque vous publiez du contenu en ligne, il peut être instantanément partagé, commenté et redistribué à travers le monde entier. Cette interconnexion signifie que vos idées peuvent atteindre un public bien au-delà de votre cercle immédiat, créant des opportunités mais aussi des défis en termes de gestion de votre présence en ligne.",
    example:
      "Imaginez que vous postiez une vidéo de votre chat faisant un tour amusant. En quelques heures, elle pourrait être vue par des gens en Australie, au Brésil ou au Japon, créant une chaîne de partages et de réactions à l'échelle mondiale.",
    image: "/images/networked-media.jpg", // We'll add this image later
  },
  {
    id: 2,
    title: "Les médias numériques ont des auditoires imprévus",
    content:
      "Dans le monde numérique, le contrôle sur qui voit vos publications est souvent limité. Même avec des paramètres de confidentialité stricts, le contenu peut être partagé, capturé ou redistribué de manières inattendues. Cela signifie que vos messages peuvent atteindre des personnes que vous n'aviez pas envisagées comme public, y compris de futurs employeurs, des membres de la famille ou même des étrangers du monde entier.",
    example:
      "Vous postez une blague sur votre compte privé, pensant que seuls vos amis la verront. Mais si l'un d'eux la partage, elle pourrait être vue par leurs amis, leurs parents, ou même vos futurs employeurs, influençant potentiellement votre image professionnelle.",
    image: "/images/unexpected-audience.jpg", // We'll add this image later
  },
  {
    id: 3,
    title: "Les médias numériques sont partageables et continus",
    content:
      "Une fois qu'une information est publiée en ligne, elle peut persister indéfiniment. Même si vous supprimez le contenu original, des copies peuvent exister ailleurs sur internet. Cette permanence signifie que les actions en ligne peuvent avoir des conséquences à long terme, affectant votre réputation et vos opportunités futures. Il est crucial de réfléchir avant de publier et de comprendre l'impact potentiel à long terme de vos actions en ligne.",
    example:
      "Vous postez une photo embarrassante et la supprimez après quelques minutes. Cependant, pendant ce court laps de temps, quelqu'un a pu la sauvegarder ou faire une capture d'écran. Des années plus tard, cette photo pourrait réapparaître dans un contexte complètement différent.",
    image: "/images/shareable-persistent.jpg", // We'll add this image later
  },
  {
    id: 4,
    title: "Nos interactions peuvent avoir un impact réel",
    content:
      "Les actions en ligne ne sont pas isolées du monde réel. Elles peuvent avoir des conséquences tangibles sur nos vies et celles des autres. Un commentaire positif peut booster la confiance de quelqu'un, tandis qu'un message négatif peut causer un préjudice émotionnel réel. De plus, les mouvements sociaux, les campagnes de sensibilisation et même les décisions politiques peuvent être influencés par des actions collectives en ligne.",
    example:
      "Vous laissez un commentaire encourageant sur la vidéo d'un ami qui apprend à jouer de la guitare. Ce simple geste pourrait lui donner la confiance nécessaire pour continuer à pratiquer et même jouer en public un jour, transformant potentiellement sa vie.",
    image: "/images/real-impact.jpg", // We'll add this image later
  },
  {
    id: 5,
    title: "Notre expérience est façonnée par les outils numériques",
    content:
      "Les algorithmes et la personnalisation jouent un rôle crucial dans notre expérience en ligne. Les réseaux sociaux, les moteurs de recherche et les plateformes de streaming utilisent des algorithmes sophistiqués pour déterminer ce que nous voyons. Cela peut créer des 'bulles de filtre' où nous sommes principalement exposés à des informations qui renforcent nos opinions existantes. Comprendre ce phénomène est essentiel pour développer un esprit critique et une vision équilibrée du monde.",
    example:
      "Si vous regardez beaucoup de vidéos sur les chats, vous remarquerez que YouTube vous suggère de plus en plus de contenus liés aux chats. C'est l'algorithme qui essaie de vous montrer ce qu'il pense que vous aimerez, basé sur votre historique de visionnage.",
    image: "/images/digital-shaping.jpg", // We'll add this image later
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
      const prompt = `Générez un exemple concret et détaillé pour illustrer le concept suivant du monde numérique : "${concept.title}". L'exemple doit être adapté à un public adolescent et doit clairement démontrer l'importance et l'application pratique de ce concept dans leur vie quotidienne. Répondez en français.`
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{concept.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <Image src={concept.image || "/placeholder.svg"} alt={concept.title} layout="fill" objectFit="cover" />
        </div>
        <p className="text-lg mb-4">{concept.content}</p>
        <h2 className="text-2xl font-semibold mb-2">Exemple :</h2>
        <p className="text-lg italic mb-4">{concept.example}</p>
        <div className="mt-6">
          <button
            onClick={generateExample}
            disabled={isGenerating}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            {isGenerating ? "Génération en cours..." : "Générer un nouvel exemple avec Mistral AI"}
          </button>
          {generatedExample && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-xl font-semibold mb-2">Exemple généré :</h3>
              <p>{generatedExample}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

