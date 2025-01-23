"use client"

import Image from "next/image"
import { ClientSideAnimation } from "@/components/ClientSideAnimation"

const tips = [
  {
    title: "Sécurité en ligne",
    items: [
      "Utilise des mots de passe forts : Inclue une combinaison de lettres, chiffres et symboles. Ne les partage avec personne.",
      "Vérifie les paramètres de confidentialité : Paramètre tes comptes pour contrôler qui peut voir tes publications.",
      "Ne partage pas d'informations personnelles : Comme ton adresse, ton numéro de téléphone ou ton école.",
    ],
    image: "/images/online-security.jpg",
    gradient: "from-purple-500 to-teal-500",
  },
  {
    title: "Vérification des Informations",
    items: [
      "Fais attention aux fake news : Vérifie toujours plusieurs sources avant de croire ou partager une information.",
      "Regarde les sources : Privilégie les sites fiables (.edu, .gov, médias reconnus).",
    ],
    image: "/images/fact-checking.jpg",
    gradient: "from-teal-500 to-pink-500",
  },
  {
    title: "Gestion du Temps",
    items: [
      "Fixe des limites : Utilise des applications pour suivre ton temps d'écran.",
      "Équilibre numérique et vie réelle : Prends des pauses et fais d'autres activités comme du sport ou des sorties avec des amis.",
    ],
    image: "/images/time-management.jpg",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Respect et Communication Positive",
    items: [
      'Pense avant de publier : "Est-ce que ce que je poste est gentil, nécessaire et vrai ?"',
      "Signale les comportements nuisibles : Cyberharcèlement, messages inappropriés, etc.",
      "Sois bienveillant : Encourage les autres et ne participe pas aux messages négatifs.",
    ],
    image: "/images/positive-communication.jpg",
    gradient: "from-purple-500 to-teal-500",
  },
  {
    title: "Développer une Présence Numérique Positive",
    items: [
      "Partage des contenus positifs : Montre tes passions, projets créatifs ou centres d'intérêt.",
      "Construis ton identité numérique : Ce que tu publies peut avoir un impact sur ton futur (comme les employeurs qui vérifient les réseaux sociaux).",
    ],
    image: "/images/positive-presence.jpg",
    gradient: "from-teal-500 to-pink-500",
  },
  {
    title: "Utilisation Éthique",
    items: [
      "Respecte les droits d'auteur : Donne du crédit aux créateurs de contenu que tu utilises ou partage.",
      "Ne pirate pas : Télécharge les contenus de manière légale.",
    ],
    image: "/images/ethical-use.jpg",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "Éducation et Développement",
    items: [
      "Utilise Internet pour apprendre : Découvre des cours en ligne, des tutoriels ou des ressources pour tes passions.",
      "Suis des personnes inspirantes : Trouve des modèles qui partagent des conseils motivants ou utiles.",
    ],
    image: "/images/education-development.jpg",
    gradient: "from-purple-500 to-teal-500",
  },
]

export default function ConseilsPage() {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">
        <ClientSideAnimation>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">
            Conseils pour une Présence en Ligne Positive
          </h1>
        </ClientSideAnimation>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <ClientSideAnimation key={index} delay={index * 0.1}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-purple-100">
                <div className="relative h-48">
                  <Image src={tip.image || "/placeholder.svg"} alt={tip.title} layout="fill" objectFit="cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${tip.gradient} opacity-60`}></div>
                  <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{tip.title}</h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {tip.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-teal-500 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ClientSideAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

