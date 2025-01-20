import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function Home() {
  return (
    <motion.div className="container mx-auto px-4 py-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-4xl font-bold text-center mb-8" variants={itemVariants}>
        Bienvenue dans le Monde Numérique
      </motion.h1>

      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">Découvre les concepts clés :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Les médias numériques sont en réseau",
            "Les médias numériques ont des auditoires imprévus",
            "Les médias numériques sont partageables et continus",
            "Nos interactions peuvent avoir un impact réel",
            "Notre expérience est façonnée par les outils numériques",
          ].map((concept, index) => (
            <motion.div
              key={index}
              className="bg-blue-100 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-lg font-semibold mb-2">{concept}</h3>
              <Link href={`/concepts/${index + 1}`} className="text-blue-600 hover:underline">
                En savoir plus
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="text-center" variants={itemVariants}>
        <Link href="/conseils">
          <motion.a
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Découvre nos conseils pour une présence en ligne positive
          </motion.a>
        </Link>
      </motion.div>
    </motion.div>
  )
}

