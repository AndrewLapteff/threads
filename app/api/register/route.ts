import { connectMongoDb } from "@/lib/db"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import { hash } from 'bcrypt'
<<<<<<< HEAD
import { sign } from "jsonwebtoken"
import { serialize } from "cookie"

const EXP = 30 * 24 * 60 * 60
=======
>>>>>>> 1ba57013fcdbbc377c219a568816a3b61f596156

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()

    const hashedPassword = await hash(password, 10)
    await connectMongoDb()
<<<<<<< HEAD
    const token = sign({ username, email, password }, process.env.JWT_SECRET as string, { expiresIn: EXP })
    const serialized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: EXP,
      path: '/',
    })
    await User.create({ username, email, password: hashedPassword })
    const response = NextResponse.json({ message: 'User registered', status: 201 })
    response.cookies.set('token', serialized, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: EXP,
      path: '/',
      sameSite: 'strict',
    })
    return response
=======
    await User.create({ username, email, password: hashedPassword })
    return NextResponse.json({ message: 'User registered', status: 201 })
>>>>>>> 1ba57013fcdbbc377c219a568816a3b61f596156
  } catch (error) {
    return NextResponse.json({ message: 'Error occured while registering user', status: 500 })
  }

}