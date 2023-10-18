import { EXP } from "@/app/constants"
import { connectMongoDb } from "@/lib/db"
import User from "@/models/user"
import { hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { NextResponse } from "next/server"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { username, email, password } = credentials

          const hashedPassword = await hash(password, 10)
          await connectMongoDb()
          const user = await User.create({ username, email, password: hashedPassword })
          return user
        } catch (error) {
          return NextResponse.json({ message: 'Error occured while registering user', status: 500 })
        }
      },
    })
  ],
  secret: 'secret',
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/sign-in'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }