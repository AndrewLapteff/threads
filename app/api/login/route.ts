import { connectToDb } from "@/lib/db"
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken"
import { EXP } from "@/app/constants"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    await connectToDb()
    const user = await User.findOne({ email })
    const isCorrect = await compare(password, user.password)

    if (isCorrect) {
      delete user.password
      const token = sign({ username: user.username, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: EXP })
      const response = NextResponse.json({ user })
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: EXP,
        path: '/',
        sameSite: 'strict',
      })
      return response
    } else {
      return NextResponse.json({ error: 'Incorrect password. Please check your password and try again' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Incorrect password. Please check your password and try again' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 404 })
  }
}