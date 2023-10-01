import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/Header'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Footer from '@/components/shared/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'An application for communication',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container">
            <div className="w-full max-w-4xl">{children}</div>
          </section>
          <RightSidebar />
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout
