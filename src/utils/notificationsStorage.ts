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

export const saveDeletedNotifications = (userId: string, deletedIds: string[]) => {
  try {
    localStorage.setItem(`deleted_notifications_${userId}`, JSON.stringify(deletedIds))
  } catch {
    // ignore
  }
}

export const loadDeletedNotifications = (userId: string): string[] => {
  try {
    const data = localStorage.getItem(`deleted_notifications_${userId}`)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export const addDeletedNotification = (userId: string, notificationId: string) => {
  const deleted = loadDeletedNotifications(userId)
  if (!deleted.includes(notificationId)) {
    saveDeletedNotifications(userId, [...deleted, notificationId])
  }
}

export const isNotificationDeleted = (userId: string, notificationId: string): boolean => {
  const deleted = loadDeletedNotifications(userId)
  return deleted.includes(notificationId)
}
