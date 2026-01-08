import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { Anton, Antonio, Inter } from "next/font/google"

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
})

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-antonio",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}){
  return(
    <html lang="es">
      <body className={`${anton.variable} ${antonio.variable} ${inter.variable} min-h-screen antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}