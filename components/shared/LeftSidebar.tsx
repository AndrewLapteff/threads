'use client'

import { sidebarLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useClerk, SignOutButton } from '@clerk/nextjs'
const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useClerk()

  const logoutHandler = () => {
    signOut(() => router.push('/'))
  }

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((item) => {
          const isActive = pathname.includes(item.route)
          // const isActive =
          //   (pathname.includes(item.route) && item.route.length > 1) ||
          //   pathname === item.route
          return (
            <Link
              href={item.route}
              key={item.label}
              className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
            >
              <Image
                width={24}
                height={24}
                src={item.imgURL}
                alt={item.label}
              />
              <p className="text-light-1 max-lg:hidden">{item.label}</p>
            </Link>
          )
        })}
      </div>
      <div className="mt-10 px-6">
        <SignOutButton>
          <button>
            <Button />
          </button>
        </SignOutButton>
      </div>
    </section>
  )
}

function Button() {
  return (
    <div className="text-white leftsidebar_link">
      <Image src="assets/logout.svg" width={24} height={24} alt="logout" />
      Logout
    </div>
  )
}

export default LeftSidebar
