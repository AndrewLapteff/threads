'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'

const SignInButton = () => {
  const { data: session } = useSession()

  if (session?.user) return <button onClick={() => signOut()}> Sign out</button>

  return <button onClick={() => signIn()}>Sign in</button>
}

export default SignInButton
