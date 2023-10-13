import { z } from 'zod'
const MAX_FILE_SIZE = 500000000
const ACCEPTED_IMAGE_TYPES = [ "image/jpeg", "image/jpg", "image/png", "image/webp" ]

export const onboardingSchema = z
  .object({
    image: z
      .any().optional(), // file size check
    name: z.string().max(10, 'Too long').optional(),
    bio: z.string().max(500, 'Too long').optional(),
  })

export type OnboardingSchema = z.infer<typeof onboardingSchema>