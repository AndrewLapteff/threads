'use client'
import { sidebarLinks } from '@/constants'
import { SignedIn, SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const LeftSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
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
      <div className="mt-10 px-10">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden gap-6 p-4">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar
