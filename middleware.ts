import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET,
)

export async function middleware(request: NextRequest) {
  const { cookies } = request
  const token = cookies.get('token')
  const url = request.url
  if (url.endsWith('/')) {
    if (token === undefined)
      return NextResponse.redirect(new URL('/sign-in', request.url))

    try {
      await jwtVerify(token.value, secret)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }
  if (url.includes('sign-in')) {
    if (!token)
      return NextResponse.next()

    try {
      await jwtVerify(token.value, secret)
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error) {
      return NextResponse.next()
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [ '/', '/sign-in' ],
}