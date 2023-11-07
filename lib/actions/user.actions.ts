"use server"

import User from "@/models/user.model"
import { connectToDb } from "../db"
import { revalidatePath } from "next/cache"

interface Params {
  userId: string,
  username: string,
  name: string | null,
  bio: string | null,
  image: string,
  path: string
}

export async function updateUser(
  { userId,
    username,
    name,
    bio,
    image,
    path
  }: Params
): Promise<void> {

  connectToDb()
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        path,
        ondoarded: true
      },
      { upsert: true }
    )

    if (path === '/profile/edit')
      revalidatePath(path)

  } catch (error: any) {
    throw new Error(`Faild to create/update user: ${error.message}`)
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDb()

    return await User
      .findOne({ id: userId })
    // .populate({ path: 'communities', model: Community })
  } catch (error: any) {
    throw new Error(`Error occured while fetching user: ${error.message!}`)
  }
}