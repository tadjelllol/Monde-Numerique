import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenue dans le Monde Numérique</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Découvre les concepts clés :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Les médias numériques sont en réseau",
            "Les médias numériques ont des auditoires imprévus",
            "Les médias numériques sont partageables et continus",
            "Nos interactions peuvent avoir un impact réel",
            "Notre expérience est façonnée par les outils numériques"
          ].map((concept, index) => (
            <div key={index} className="bg-blue-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{concept}</h3>
              <Link href={`/concepts/${index + 1}`} className="text-blue-600 hover:underline">En savoir plus</Link>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Link href="/conseils" className="bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors">
          Découvre nos conseils pour une présence en ligne positive
        </Link>
      </div>
    </div>
  )
}

