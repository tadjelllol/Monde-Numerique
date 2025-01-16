import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-purple-600 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
          🌐 Monde Numérique
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/concepts" 
              className="relative group py-2"
            >
              <span>Concepts Clés</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              href="/conseils" 
              className="relative group py-2"
            >
              <span>Conseils</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              href="/quiz" 
              className="relative group py-2"
            >
              <span>Quiz</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              href="/simulation" 
              className="relative group py-2"
            >
              <span>Simulation</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
          <li>
            <Link 
              href="/footprint" 
              className="relative group py-2"
            >
              <span>Mon Empreinte</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

