import { z } from 'zod'
const MAX_FILE_SIZE = 500000000
const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/jpg", "image/png", "image/webp" ]

export const onboardingSchema = z
  .object({
    image: z
      .any(), // file size check
    name: z.string().min(4, 'Too short').max(10, 'Too long'),
    bio: z.string().min(0).max(500, 'Too long'),
  })

export type OnboardingSchema = z.infer<typeof onboardingSchema>