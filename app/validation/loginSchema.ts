import { z } from 'zod'

export const loginSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password is too short'),
    confirmPassword: z.string().min(6, 'Repeat the password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: [ 'confirmPassword' ],
    message: 'The passwords entered do not match',
  })

export type LoginSchema = z.infer<typeof loginSchema>