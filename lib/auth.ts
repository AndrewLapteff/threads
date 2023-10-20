import User from "@/models/user"
import { hash } from "bcrypt"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { NextResponse } from "next/server"
import { connectMongoDb } from "./db"
import CredentialsProvider from "next-auth/providers/credentials"

interface ICreadentials {
  username: string
  email: string
  password: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { username, email, password } = credentials as ICreadentials

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

export default NextAuth(authOptions)

