import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z.string().max(10, 'Username too long').min(4, 'Username too short'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password is too short'),
  })


export type RegisterSchema = z.infer<typeof registerSchema>