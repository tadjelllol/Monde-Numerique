import { notFound } from 'next/navigation'

const concepts = [
  {
    id: 1,
    title: "Les médias numériques sont en réseau",
    content: "Quand tu publies une vidéo, elle peut être partagée et vue partout dans le monde. Les médias numériques sont interconnectés, ce qui signifie que l'information peut se propager rapidement et largement.",
    example: "Imagine que tu postes une vidéo de ton chat faisant un tour amusant. En quelques heures, elle pourrait être vue par des gens en Australie, au Brésil ou au Japon !"
  },
  {
    id: 2,
    title: "Les médias numériques ont des auditoires imprévus",
    content: "Lorsque tu publies quelque chose en ligne, tu peux perdre le contrôle sur qui voit ton message. Tes publications peuvent atteindre des personnes que tu n'avais pas prévues.",
    example: "Tu postes une blague sur ton compte privé, pensant que seuls tes amis la verront. Mais si l'un d'eux la partage, elle pourrait être vue par leurs amis, leurs parents, ou même tes futurs employeurs !"
  },
  {
    id: 3,
    title: "Les médias numériques sont partageables et continus",
    content: "Une fois que quelque chose est posté en ligne, il est très difficile de le supprimer complètement. Les informations peuvent être copiées, partagées et sauvegardées par d'autres personnes.",
    example: "Tu postes une photo embarrassante et la supprimes après quelques minutes. Mais pendant ce temps, quelqu'un a pu la sauvegarder ou faire une capture d'écran. La photo pourrait réapparaître plus tard."
  },
  {
    id: 4,
    title: "Nos interactions peuvent avoir un impact réel",
    content: "Ce que nous faisons en ligne peut avoir des conséquences dans la vie réelle. Les commentaires positifs peuvent renforcer les relations, tandis que les commentaires négatifs peuvent vraiment blesser quelqu'un.",
    example: "Tu laisses un commentaire encourageant sur la vidéo d'un ami qui apprend à jouer de la guitare. Cela pourrait lui donner la confiance nécessaire pour continuer à pratiquer et même jouer en public un jour."
  },
  {
    id: 5,
    title: "Notre expérience est façonnée par les outils numériques",
    content: "Les algorithmes et la personnalisation influencent ce que nous voyons en ligne. Nos expériences numériques sont souvent adaptées en fonction de nos intérêts et de notre comportement en ligne.",
    example: "Si tu regardes beaucoup de vidéos sur les chats, tu remarqueras que YouTube te suggère de plus en plus de vidéos sur les chats. C'est l'algorithme qui essaie de te montrer ce qu'il pense que tu aimeras."
  }
]

export default function ConceptPage({ params }: { params: { id: string } }) {
  const concept = concepts.find(c => c.id === parseInt(params.id))

  if (!concept) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{concept.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">{concept.content}</p>
        <h2 className="text-2xl font-semibold mb-2">Exemple :</h2>
        <p className="text-lg italic">{concept.example}</p>
      </div>
    </div>
  )
}

