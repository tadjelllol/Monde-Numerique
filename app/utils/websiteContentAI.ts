import { generateMistralResponse } from "./mistralInterface"

const websiteContent = `
Concepts clés du monde numérique :
1. Les médias numériques sont en réseau : Les informations voyagent instantanément à travers le monde.
2. Les médias numériques ont des auditoires imprévus : Le contenu peut atteindre des personnes inattendues.
3. Les médias numériques sont partageables et continus : Ce qui est posté en ligne peut rester présent indéfiniment.
4. Nos interactions peuvent avoir un impact réel : Les actions en ligne influencent la vie réelle.
5. Notre expérience est façonnée par les outils numériques : Les algorithmes influencent ce que nous voyons en ligne.

Conseils pour une présence en ligne positive :
- Sécurité en ligne : Utilisez des mots de passe forts et vérifiez vos paramètres de confidentialité.
- Vérification des informations : Méfiez-vous des fake news et vérifiez vos sources.
- Gestion du temps : Fixez des limites d'utilisation et équilibrez vie numérique et réelle.
- Respect et communication positive : Réfléchissez avant de publier et soyez bienveillant.
- Développez une présence numérique positive : Partagez des contenus positifs et construisez votre identité numérique.
- Utilisation éthique : Respectez les droits d'auteur et téléchargez légalement.
- Éducation et développement : Utilisez Internet pour apprendre et suivez des personnes inspirantes.

Le site propose également :
- Un quiz interactif sur le monde numérique
- Une simulation de médias sociaux pour expérimenter les conséquences des actions en ligne
- Un outil d'analyse d'empreinte numérique
- Une section de mèmes sur la littératie numérique
`

export async function generateWebsiteContentResponse(userInput: string): Promise<string> {
  const prompt = `En tant qu'assistant IA pour un site web sur la littératie numérique pour adolescents, utilisez le contenu suivant du site pour répondre à la question de l'utilisateur. Répondez en français, de manière concise et adaptée à un public adolescent.

Contenu du site :
${websiteContent}

Question de l'utilisateur : ${userInput}

Réponse :`

  return await generateMistralResponse(prompt)
}

