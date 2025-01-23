import "./globals.css"
import { Inter } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { AIChatPopup } from "@/components/AIChatPopup"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Monde Numérique pour Ados",
  description: "Apprendre la littératie numérique de manière interactive",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow animate-fadeIn">{children}</main>
          <Footer />
          <AIChatPopup />
        </div>
      </body>
    </html>
  )
}

