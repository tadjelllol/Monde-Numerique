import Link from "next/link"
import Image from "next/image"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont connectés partout",
    description: "Découvre comment les infos voyagent à la vitesse de l'éclair dans le monde numérique.",
    image: "/images/concepts/connected-media.gif",
  },
  {
    id: 2,
    title: "Les médias numériques touchent des gens inattendus",
    description: "Apprends pourquoi ton contenu peut atteindre des personnes que tu n'avais pas prévues.",
    image: "/images/concepts/unexpected-audience.gif",
  },
  {
    id: 3,
    title: "Les médias numériques durent et se partagent facilement",
    description: "Comprends pourquoi ce que tu postes en ligne peut rester là pour toujours.",
    image: "/images/concepts/persistent-media.gif",
  },
  {
    id: 4,
    title: "Ce qu'on fait en ligne a des conséquences dans la vraie vie",
    description: "Explore l'impact réel de tes actions en ligne sur toi et les autres.",
    image: "/images/concepts/real-life-impact.jpg",
  },
  {
    id: 5,
    title: "Les outils numériques influencent ce qu'on voit",
    description: "Découvre comment les algorithmes façonnent ton expérience en ligne.",
    image: "/images/concepts/digital-influence.gif",
  },
]

export default function ConceptsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Concepts Clés du Monde Numérique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => (
          <Link key={concept.id} href={`/concepts/${concept.id}`} passHref>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative w-full mb-4 rounded-lg overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <Image
                    src={concept.image || "/placeholder.svg"}
                    alt={concept.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{concept.title}</h2>
              <p className="text-gray-600">{concept.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

