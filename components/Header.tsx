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
      className="bg-purple-600 text-white p-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
          🌐 Monde Numérique
        </Link>
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <motion.li key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link href={item.href} className="relative group py-2">
                <span>{item.label}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 ease-out"
                  initial={false}
                  animate={{ scaleX: pathname === item.href ? 1 : 0 }}
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

