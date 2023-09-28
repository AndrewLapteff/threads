import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()
    console.log(username, email, password)
    return NextResponse.json({ message: 'User registered', status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error occured while registering user', status: 500 })
  }

}