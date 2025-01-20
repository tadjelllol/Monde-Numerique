import Link from "next/link"
import Image from "next/image"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont en réseau",
    description: "Découvrez comment l'interconnexion des médias numériques façonne notre monde de l'information.",
    image: "/images/networked-media.jpg", // We'll add this image later
  },
  {
    id: 2,
    title: "Les médias numériques ont des auditoires imprévus",
    description: "Explorez les implications de la portée étendue et souvent inattendue de vos publications en ligne.",
    image: "/images/unexpected-audience.jpg", // We'll add this image later
  },
  {
    id: 3,
    title: "Les médias numériques sont partageables et continus",
    description: "Comprenez la nature durable et la facilité de partage des informations dans l'espace numérique.",
    image: "/images/shareable-persistent.jpg", // We'll add this image later
  },
  {
    id: 4,
    title: "Nos interactions peuvent avoir un impact réel",
    description: "Analysez comment nos actions en ligne influencent le monde réel et les relations interpersonnelles.",
    image: "/images/real-impact.jpg", // We'll add this image later
  },
  {
    id: 5,
    title: "Notre expérience est façonnée par les outils numériques",
    description:
      "Découvrez comment les algorithmes et la personnalisation influencent notre perception du monde numérique.",
    image: "/images/digital-shaping.jpg", // We'll add this image later
  },
]

export default function ConceptsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Concepts Clés du Monde Numérique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concepts.map((concept) => (
          <Link key={concept.id} href={`/concepts/${concept.id}`} className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image src={concept.image || "/placeholder.svg"} alt={concept.title} layout="fill" objectFit="cover" />
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

