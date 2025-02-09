"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const questions = [
  {
    question: "Que signifie 'Les médias numériques sont en réseau' ?",
    options: [
      "Les médias numériques sont tous connectés à Internet",
      "Les contenus peuvent être partagés et vus partout dans le monde",
      "Tous les médias numériques utilisent le même réseau",
      "Les médias numériques ne fonctionnent qu'en réseau",
    ],
    correctAnswer: 1,
    explanation:
      "Les médias numériques permettent le partage instantané de contenu à l'échelle mondiale. Par exemple, une vidéo TikTok créée en France peut devenir virale au Japon en quelques heures.",
  },
  {
    question: "Pourquoi est-il important de faire attention à ce qu'on publie en ligne ?",
    options: [
      "Parce que seulement nos amis peuvent voir nos publications",
      "Parce que les publications disparaissent après 24 heures",
      "Parce que nos publications peuvent atteindre des personnes inattendues",
      "Parce que personne ne s'intéresse à ce qu'on publie",
    ],
    correctAnswer: 2,
    explanation:
      "Internet a une portée mondiale. Ce que vous publiez peut être vu par des personnes que vous ne connaissez pas, y compris des employeurs potentiels ou des institutions.",
  },
  {
    question: "Que signifie 'Les médias numériques sont partageables et continus' ?",
    options: [
      "Les médias numériques sont toujours en ligne",
      "Il est facile de supprimer complètement un contenu en ligne",
      "Une fois posté, il est très difficile de supprimer complètement un contenu",
      "Les médias numériques ne peuvent être partagés qu'une seule fois",
    ],
    correctAnswer: 2,
    explanation:
      "Même si vous supprimez un contenu, il peut rester accessible via des captures d'écran, des copies ou des archives. Il est presque impossible de le supprimer complètement d'Internet.",
  },
  {
    question: "Comment nos interactions en ligne peuvent-elles avoir un impact réel ?",
    options: [
      "Elles n'ont aucun impact dans la vie réelle",
      "Les commentaires positifs peuvent renforcer les relations",
      "Ce qu'on fait en ligne reste toujours en ligne",
      "Les interactions en ligne sont moins importantes que celles en personne",
    ],
    correctAnswer: 1,
    explanation:
      "Vos interactions en ligne peuvent influencer vos relations personnelles, professionnelles et même juridiques. La cyberintimidation, par exemple, a des conséquences réelles.",
  },
  {
    question: "Comment notre expérience est-elle façonnée par les outils numériques ?",
    options: [
      "Tous les utilisateurs voient exactement le même contenu en ligne",
      "Les algorithmes n'influencent pas ce que nous voyons en ligne",
      "Notre expérience en ligne est personnalisée en fonction de nos intérêts",
      "Les outils numériques n'ont aucun impact sur notre expérience en ligne",
    ],
    correctAnswer: 2,
    explanation:
      "Les algorithmes des réseaux sociaux et des moteurs de recherche influencent fortement le contenu que vous voyez, créant une expérience personnalisée, parfois même une bulle de filtre.",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  const handleAnswerClick = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex)
    setShowExplanation(true)
    if (selectedIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowScore(true)
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-purple-50 via-white to-teal-50">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Quiz sur le Monde Numérique
        </motion.h1>

        {showScore ? (
          <motion.div
            className="text-center bg-white p-8 rounded-xl shadow-lg border border-purple-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-4 gradient-text">
              Tu as obtenu {score} sur {questions.length} !
            </h2>
            <motion.button
              onClick={() => {
                setCurrentQuestion(0)
                setScore(0)
                setShowScore(false)
                setSelectedAnswer(null)
                setShowExplanation(false)
              }}
              className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Recommencer le quiz
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-purple-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-purple-900">
              Question {currentQuestion + 1} sur {questions.length}
            </h2>
            <p className="text-lg mb-6">{questions[currentQuestion].question}</p>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={showExplanation}
                  className={`w-full text-left p-4 rounded-lg transition-all transform hover:scale-102 ${
                    showExplanation
                      ? index === questions[currentQuestion].correctAnswer
                        ? "bg-green-100 border-2 border-green-500"
                        : selectedAnswer === index
                          ? "bg-red-100 border-2 border-red-500"
                          : "bg-gray-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  whileHover={showExplanation ? {} : { scale: 1.02 }}
                  whileTap={showExplanation ? {} : { scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-100"
                >
                  <p className="font-semibold mb-2">
                    {selectedAnswer === questions[currentQuestion].correctAnswer ? "✅ Correct !" : "❌ Incorrect !"}
                  </p>
                  <p>{questions[currentQuestion].explanation}</p>
                  <motion.button
                    onClick={handleNextQuestion}
                    className="mt-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Question suivante
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

