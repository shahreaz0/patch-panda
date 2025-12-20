import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(text: string, defaultValue: string = "N/A") {
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return defaultValue
  }

  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0)

  if (words.length === 0) {
    return defaultValue
  }

  const initials = words
    .map((word) => word[0]?.toUpperCase() || "")
    .filter((char) => /[A-Za-z]/.test(char))
    .join("")

  return initials || defaultValue
}

export function generateAvatarUrl(name: string) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${name}&fontSize=41&fontWeight=600`
}
