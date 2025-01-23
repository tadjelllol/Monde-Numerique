import Link from "next/link"
import { ClientSideAnimation } from "@/components/ClientSideAnimation"

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont en réseau",
    description: "Découvre comment les informations voyagent instantanément à travers le monde numérique.",
    gradient: "from-purple-500 to-teal-500",
  },
  {
    id: 2,
    title: "Les médias numériques ont des auditoires imprévus",
    description: "Comprends pourquoi ton contenu peut atteindre des personnes que tu n'avais pas imaginées.",
    gradient: "from-teal-500 to-pink-500",
  },
  {
    id: 3,
    title: "Les médias numériques sont partageables et continus",
    description: "Apprends pourquoi ce que tu postes en ligne peut rester présent pour toujours.",
    gradient: "from-pink-500 to-purple-500",
  },
  {
    id: 4,
    title: "Nos interactions peuvent avoir un impact réel",
    description: "Explore comment tes actions en ligne peuvent influencer ta vie réelle et celle des autres.",
    gradient: "from-purple-500 to-teal-500",
  },
  {
    id: 5,
    title: "Notre expérience est façonnée par les outils numériques",
    description: "Découvre comment les algorithmes et les plateformes influencent ce que tu vois en ligne.",
    gradient: "from-teal-500 to-pink-500",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto">
        <ClientSideAnimation>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Bienvenue dans le Monde Numérique
          </h1>
        </ClientSideAnimation>

        <ClientSideAnimation delay={0.2}>
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-purple-900">
              Découvre les concepts clés :
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {concepts.map((concept, index) => (
                <ClientSideAnimation key={concept.id} delay={index * 0.1}>
                  <Link href={`/concepts/${concept.id}`} className="block">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
                      <h3 className="text-xl font-semibold mb-3 text-purple-900">{concept.title}</h3>
                      <p className="text-gray-600 mb-4">{concept.description}</p>
                      <div className={`w-full h-2 rounded-full bg-gradient-to-r ${concept.gradient}`}></div>
                    </div>
                  </Link>
                </ClientSideAnimation>
              ))}
            </div>
          </div>
        </ClientSideAnimation>

        <ClientSideAnimation delay={0.4}>
          <div className="text-center">
            <Link
              href="/conseils"
              className="inline-block bg-gradient-to-r from-purple-600 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <ClientSideAnimation>
                <span className="flex items-center">
                  <span className="mr-2">👉</span>
                  Découvre nos conseils pour une présence en ligne positive
                </span>
              </ClientSideAnimation>
            </Link>
          </div>
        </ClientSideAnimation>

        <ClientSideAnimation delay={0.6}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Quiz Interactif</h3>
              <p className="text-gray-600 mb-4">
                Teste tes connaissances sur le monde numérique avec notre quiz amusant et éducatif.
              </p>
              <Link href="/quiz" className="text-teal-600 font-semibold hover:underline">
                Commencer le quiz →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Simulation de Médias Sociaux</h3>
              <p className="text-gray-600 mb-4">
                Expérimente les conséquences de tes actions en ligne dans un environnement sûr et contrôlé.
              </p>
              <Link href="/simulation" className="text-teal-600 font-semibold hover:underline">
                Essayer la simulation →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <h3 className="text-xl font-semibold mb-3 text-purple-900">Analyse d'Empreinte Numérique</h3>
              <p className="text-gray-600 mb-4">
                Découvre l'impact de ta présence en ligne et apprends à la gérer de manière responsable.
              </p>
              <Link href="/footprint" className="text-teal-600 font-semibold hover:underline">
                Analyser mon empreinte →
              </Link>
            </div>
          </div>
        </ClientSideAnimation>
      </div>
    </div>
  )
}

