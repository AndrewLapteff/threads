import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/shared/Header'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Footer from '@/components/shared/Footer'
import { ClerkProvider, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'An application for communication',
}

async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()
  if (!user) return redirect('/sing-in')

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Header />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSidebar />
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}

export default RootLayout
