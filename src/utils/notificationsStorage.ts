import type { TNotification } from './types'

export const saveNotifications = (userId: string, notifications: TNotification[]) => {
  try {
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications))
  } catch {
    // ignore
  }
}

export const loadNotifications = (userId: string): TNotification[] | null => {
  try {
    const data = localStorage.getItem(`notifications_${userId}`)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

export const saveReadStatuses = (userId: string, notifications: TNotification[]) => {
  try {
    const readStatuses: Record<string, boolean> = {}
    notifications.forEach((n) => {
      readStatuses[n.id] = n.isRead
    })
    localStorage.setItem(`notifications_read_${userId}`, JSON.stringify(readStatuses))
  } catch {
    // ignore
  }
}

export const loadReadStatuses = (userId: string): Record<string, boolean> => {
  try {
    const data = localStorage.getItem(`notifications_read_${userId}`)
    return data ? JSON.parse(data) : {}
  } catch {
    return {}
  }
}

export const clearUserNotificationsData = (userId: string) => {
  localStorage.removeItem(`notifications_${userId}`)
  localStorage.removeItem(`notifications_read_${userId}`)
}
