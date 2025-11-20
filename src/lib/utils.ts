import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    date
  )
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  )
  const day = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
  const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(
    date
  )

  return `${weekday}, ${month} ${day}, ${year}`
}

export function formatToWeekday(date: Date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)
}
