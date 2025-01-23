"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const Header = () => {
  const pathname = usePathname()

  const navItems = [
    { href: "/concepts", label: "Concepts Clés" },
    { href: "/conseils", label: "Conseils" },
    { href: "/quiz", label: "Quiz" },
    { href: "/simulation", label: "Simulation" },
    { href: "/footprint", label: "Mon Empreinte" },
    { href: "/memes", label: "Mèmes" },
  ]

  return (
    <motion.header
      className="bg-gradient-to-r from-purple-600 to-teal-600 text-white p-4 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="text-3xl">🌐</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">
              Monde Numérique
            </span>
          </motion.div>
        </Link>
        <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
          {navItems.map((item) => (
            <motion.li key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href={item.href}
                className={`relative group py-2 px-3 rounded-lg transition-colors ${
                  pathname === item.href ? "bg-white bg-opacity-10" : "hover:bg-white hover:bg-opacity-5"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left"
                  initial={false}
                  animate={{ scaleX: pathname === item.href ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

export default Header

