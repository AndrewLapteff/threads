'use client'

import { UserButton, UserProfile } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { dark } from '@clerk/themes'

const Header = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-light-1 text-heading3-bold max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <UserProfile
          appearance={{ baseTheme: dark }}
          path="/user-profile"
          routing="path"
        />
        <UserButton
          appearance={{ baseTheme: dark }}
          afterSignOutUrl="/sign-in"
        />
        <div className="block md:hidden">
          <button className="flex items-center justify-center">
            <Image
              src="assets/logout.svg"
              width={20}
              height={20}
              alt="logout"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
