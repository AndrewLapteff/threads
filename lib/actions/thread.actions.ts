"use server"

import Thread from "@/models/thread.model"
import { connectToDb } from "../db"

interface Params {
  text: string
  author: string
  communityId: string | null
  path: string
}

export async function createThread({ text, author, communityId, path }: Params) {
  connectToDb()

  const createdThread = await Thread
}