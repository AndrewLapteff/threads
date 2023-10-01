import { z } from 'zod'

export const formSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password is too short'),
    confirmPassword: z.string().min(6, 'Repeat the password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: [ 'confirmPassword' ],
    message: 'Введенные пароли не совпадают',
  })

export type FormSchema = z.infer<typeof formSchema>