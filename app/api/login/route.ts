import { connectMongoDb } from "@/lib/db"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import { compare } from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    console.log(password)
    await connectMongoDb()
    const user = await User.findOne({ email })
    if (await compare(password, user.password)) {
      delete user.password
      return NextResponse.json({ user })
    }
    return NextResponse.json({ error: 'Incorrect password. Please check your password and try again' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Account not found. Please verify the username or email' }, { status: 404 })
  }
}