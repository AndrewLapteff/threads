'use client'

import { SessionProvider, useSession } from 'next-auth/react'

export function HomeComponent() {
  const { data, status } = useSession({ required: true })
  if (status === 'loading') {
    return <p className="text-white text-center">Loading</p>
  }
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
    </>
  )
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeComponent />
    </SessionProvider>
  )
}
