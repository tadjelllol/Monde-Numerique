const tips = [
  {
    title: "Sécurité en ligne",
    items: [
      "Utilise des mots de passe forts : Inclue une combinaison de lettres, chiffres et symboles. Ne les partage avec personne.",
      "Vérifie les paramètres de confidentialité : Paramètre tes comptes pour contrôler qui peut voir tes publications.",
      "Ne partage pas d'informations personnelles : Comme ton adresse, ton numéro de téléphone ou ton école."
    ]
  },
  {
    title: "Vérification des Informations",
    items: [
      "Fais attention aux fake news : Vérifie toujours plusieurs sources avant de croire ou partager une information.",
      "Regarde les sources : Privilégie les sites fiables (.edu, .gov, médias reconnus)."
    ]
  },
  {
    title: "Gestion du Temps",
    items: [
      "Fixe des limites : Utilise des applications pour suivre ton temps d'écran.",
      "Équilibre numérique et vie réelle : Prends des pauses et fais d'autres activités comme du sport ou des sorties avec des amis."
    ]
  },
  {
    title: "Respect et Communication Positive",
    items: [
      "Pense avant de publier : \"Est-ce que ce que je poste est gentil, nécessaire et vrai ?\"",
      "Signale les comportements nuisibles : Cyberharcèlement, messages inappropriés, etc.",
      "Sois bienveillant : Encourage les autres et ne participe pas aux messages négatifs."
    ]
  },
  {
    title: "Développer une Présence Numérique Positive",
    items: [
      "Partage des contenus positifs : Montre tes passions, projets créatifs ou centres d'intérêt.",
      "Construis ton identité numérique : Ce que tu publies peut avoir un impact sur ton futur (comme les employeurs qui vérifient les réseaux sociaux)."
    ]
  },
  {
    title: "Utilisation Éthique",
    items: [
      "Respecte les droits d'auteur : Donne du crédit aux créateurs de contenu que tu utilises ou partage.",
      "Ne pirate pas : Télécharge les contenus de manière légale."
    ]
  },
  {
    title: "Éducation et Développement",
    items: [
      "Utilise Internet pour apprendre : Découvre des cours en ligne, des tutoriels ou des ressources pour tes passions.",
      "Suis des personnes inspirantes : Trouve des modèles qui partagent des conseils motivants ou utiles."
    ]
  }
]

export default function ConseilsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Conseils pour une Présence en Ligne Positive</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{tip.title}</h2>
            <ul className="list-disc pl-5 space-y-2">
              {tip.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

