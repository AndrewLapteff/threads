import '../globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Threads',
  description: 'An application for communication',
}

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} relative bg-dark-1 flex flex-col justify-center min-h-screen overflow-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
