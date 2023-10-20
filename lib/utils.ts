import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isImageBase64(dataString: string) {
  const base64regexp = /^data:image\/(png|jpe?g|gif|webp);base64,/
  return base64regexp.test(dataString)
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const date = new Date()
}