import Link from "next/link"
import Image from "next/image"
import { ClientSideAnimation } from "@/components/ClientSideAnimation"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont connectés partout",
    description: "Découvre comment les infos voyagent à la vitesse de l'éclair dans le monde numérique.",
    image: "/images/concepts/connected-media.jpg",
    gradient: "from-purple-500 to-teal-500",
  },
  {
    id: 2,
    title: "Les médias numériques touchent des gens inattendus",
    description: "Apprends pourquoi ton contenu peut atteindre des personnes que tu n'avais pas prévues.",
    image: "/images/concepts/unexpected-audience.jpg",
    gradient: "from-teal-500 to-pink-500",
  },
  {
    id: 3,
    title: "Les médias numériques durent et se partagent facilement",
    description: "Comprends pourquoi ce que tu postes en ligne peut rester là pour toujours.",
    image: "/images/concepts/persistent-media.jpg",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    id: 4,
    title: "Ce qu'on fait en ligne a des conséquences dans la vraie vie",
    description: "Explore l'impact réel de tes actions en ligne sur toi et les autres.",
    image: "/images/concepts/real-life-impact.jpg",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    title: "Les outils numériques influencent ce qu'on voit",
    description: "Découvre comment les algorithmes façonnent ton expérience en ligne.",
    image: "/images/concepts/digital-influence.jpg",
    gradient: "from-teal-500 to-purple-500",
  },
]

export default function ConceptsPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <ClientSideAnimation>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Concepts Clés du Monde Numérique
          </h1>
        </ClientSideAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {concepts.map((concept, index) => (
            <ClientSideAnimation key={concept.id} delay={index * 0.1}>
              <Link href={`/concepts/${concept.id}`}>
                <div className="bg-white rounded-xl overflow-hidden card-hover border border-purple-100">
                  <div className="relative">
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={concept.image || "/placeholder.svg"}
                        alt={concept.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${concept.gradient} opacity-20`}></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2 text-purple-900">{concept.title}</h2>
                    <p className="text-gray-600">{concept.description}</p>
                    <div className="mt-4 flex items-center text-teal-600 font-medium">
                      En savoir plus
                      <svg
                        className="w-4 h-4 ml-2 transition-transform transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </ClientSideAnimation>
          ))}
        </div>
      </div>
    </div>
  )
}

