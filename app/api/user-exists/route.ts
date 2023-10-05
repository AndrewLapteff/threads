import { connectMongoDb } from "@/lib/db"
import User from "@/models/user"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    await connectMongoDb()
    const user = await User.findOne({ email }).select("_id")
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json({})
  }
}