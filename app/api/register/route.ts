import { connectMongoDb } from "@/lib/db"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import { hash } from 'bcrypt'

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()

    const hashedPassword = await hash(password, 10)
    await connectMongoDb()
    await User.create({ username, email, password: hashedPassword })
    return NextResponse.json({ message: 'User registered', status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error occured while registering user', status: 500 })
  }

}