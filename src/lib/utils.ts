import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(dateString: string = ''): string {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000 // Number of seconds in a year

  if (interval >= 1) {
    return interval >= 2 ? `${Math.floor(interval)} years ago` : '1 year ago'
  }
  interval = seconds / 2592000 // Number of seconds in a month
  if (interval >= 1) {
    return interval >= 2 ? `${Math.floor(interval)} months ago` : '1 month ago'
  }
  interval = seconds / 86400 // Number of seconds in a day
  if (interval >= 1) {
    return interval >= 2 ? `${Math.floor(interval)} days ago` : '1 day ago'
  }
  interval = seconds / 3600 // Number of seconds in an hour
  if (interval >= 1) {
    return interval >= 2 ? `${Math.floor(interval)} hours ago` : '1 hour ago'
  }
  interval = seconds / 60 // Number of seconds in a minute
  if (interval >= 1) {
    return interval >= 2
      ? `${Math.floor(interval)} minutes ago`
      : '1 minute ago'
  }
  return seconds >= 2 ? `${Math.floor(seconds)} seconds ago` : '1 second ago'
}

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId)
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)
