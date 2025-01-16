import Link from 'next/link'

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont en réseau",
    description: "Découvre comment les contenus se propagent à travers le monde."
  },
  {
    id: 2,
    title: "Les médias numériques ont des auditoires imprévus",
    description: "Apprends comment tes publications peuvent atteindre des personnes inattendues."
  },
  {
    id: 3,
    title: "Les médias numériques sont partageables et continus",
    description: "Comprends la permanence et la circulation des informations en ligne."
  },
  {
    id: 4,
    title: "Nos interactions peuvent avoir un impact réel",
    description: "Explore l'impact de tes actions en ligne sur le monde réel."
  },
  {
    id: 5,
    title: "Notre expérience est façonnée par les outils numériques",
    description: "Découvre comment les algorithmes influencent ton expérience en ligne."
  }
]

export default function ConceptsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Concepts Clés du Monde Numérique</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept) => (
          <Link key={concept.id} href={`/concepts/${concept.id}`} className="block">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">{concept.title}</h2>
              <p className="text-gray-600">{concept.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

