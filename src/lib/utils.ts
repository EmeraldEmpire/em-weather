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

export const removeDecimal = (num: number) => Math.trunc(num)

export function unitConverter(unit: string, value: number) {
  let convertedVal: number

  switch (unit) {
    case 'fahrenheit':
      convertedVal = (value * 9) / 5 + 32
      break

    case 'mph':
      convertedVal = value * 0.621371
      break

    case 'in':
      convertedVal = value * 0.03937
      break

    default:
      convertedVal = value
  }

  return removeDecimal(convertedVal)

  // celsiusToFahrenheit: function (celsius: number) {
  //   return (celsius * 9) / 5 + 32
  // },

  // kphToMph: function (kph: number) {
  //   return kph * 0.621371
  // },

  // mmToInc: function (mm: number) {
  //   return mm * 0.03937
  // },
}

export const weatherUnits = {
  celsius: '°C',
  fahrenheit: '°F',
  kph: 'km/h',
  mph: 'mph',
  mm: 'mm',
  in: 'in',
}
