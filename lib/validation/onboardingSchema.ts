import { z } from 'zod'


export const onboardingSchema = z
  .object({
    image: z
      .any().optional()
    ,
    name: z.string().min(4, 'Too short').max(20, 'Too long').optional(),
    bio: z.string().max(500, 'Too long').optional(),
  })

export type OnboardingSchema = z.infer<typeof onboardingSchema>