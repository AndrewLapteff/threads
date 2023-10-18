'use client'

import Image from 'next/image'
import Link from 'next/link'
import Providers from './Providers'
import { useSession } from 'next-auth/react'

const HeaderComponent = () => {
  return (
    <Providers>
      <nav className="topbar">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
          <p className="text-light-1 text-heading3-bold max-xs:hidden">
            Threads
          </p>
        </Link>
        <div className="flex items-center gap-1">
          <div className="block md:hidden"></div>
        </div>
      </nav>
    </Providers>
  )
}

const Header = () => {
  return (
    <Providers>
      <HeaderComponent />
    </Providers>
  )
}

export default Header
