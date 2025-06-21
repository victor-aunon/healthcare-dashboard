import { z } from 'zod'

const envSchema = z.object({
  VITE_BASE_URL: z.string().url(),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  throw new Error('Invalid environment variables')
}

export const env = parsed.data
