import type { TExchange, TNotification, TToast, TUser } from '@/utils'
import { clearReadNotificationsApi, markAllNotificationsAsReadApi } from '@/utils/api'
import { loadReadStatuses, saveNotifications, saveReadStatuses } from '@/utils/notificationsStorage'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from './root'
import { updateUserNotifications } from './user-slice'

interface NotificationsState {
  loading: boolean
  error: string | null
  activeToasts: TToast[]
}

const initialState: NotificationsState = {
  loading: false,
  error: null,
  activeToasts: [],
}

const exchangeToNotification = (
  exchange: TExchange,
  users: TUser[],
  currentUserId: string
): TNotification | null => {
  if (exchange.toUserId === currentUserId && exchange.status === 'pending') {
    const fromUser = users.find((u) => u.id === exchange.fromUserId)
    return {
      id: `exchange_${exchange.id}_incoming`,
      user: fromUser?.name || 'Пользователь',
      text: 'предлагает вам обмен',
      date: new Date().toLocaleDateString('ru-RU'),
      isRead: false,
      link: `/profile/${exchange.fromUserId}`,
      exchangeId: exchange.id,
      type: 'incoming',
    }
  }

  if (exchange.fromUserId === currentUserId && exchange.status === 'accepted') {
    const toUser = users.find((u) => u.id === exchange.toUserId)
    return {
      id: `exchange_${exchange.id}_accepted`,
      user: toUser?.name || 'Пользователь',
      text: 'принял(-а) ваш обмен',
      date: new Date().toLocaleDateString('ru-RU'),
      isRead: false,
      link: `/profile/${exchange.toUserId}`,
      exchangeId: exchange.id,
      type: 'accepted',
    }
  }

  return null
}

// Генерация актуальных уведомлений из заявок
const generateNotificationsFromExchanges = (
  exchanges: TExchange[],
  users: TUser[],
  currentUserId: string
): TNotification[] => {
  const notifications: TNotification[] = []

  exchanges.forEach((exchange) => {
    const notification = exchangeToNotification(exchange, users, currentUserId)
    if (notification) {
      notifications.push(notification)
    }
  })

  return notifications
}

export const updateNotificationsFromExchanges = createAsyncThunk(
  'notifications/updateFromExchanges',
  async (userId: string, { dispatch, getState }) => {
    const state = getState() as RootState
    const exchanges = state.exchanges.exchanges
    const users = state.users.users

    if (!users.length) return []

    // Генерируем уведомления из заявок
    const generatedNotifications = generateNotificationsFromExchanges(exchanges, users, userId)

    // Загружаем сохраненные статусы прочтения
    const savedReadStatuses = loadReadStatuses(userId)

    const notificationsWithState = generatedNotifications.map((notification) => ({
      ...notification,
      isRead: savedReadStatuses[notification.id] || false,
    }))

    // Сохраняем в localStorage
    saveNotifications(userId, notificationsWithState)
    saveReadStatuses(userId, notificationsWithState)

    // Обновляем store
    dispatch(updateUserNotifications(notificationsWithState))

    // Показываем тосты для новых непрочитанных
    const shownToastsKey = `shown_toasts_${userId}`
    const shownToasts = new Set(JSON.parse(localStorage.getItem(shownToastsKey) || '[]'))

    notificationsWithState.forEach((notification, i) => {
      if (!notification.isRead && !shownToasts.has(notification.id)) {
        setTimeout(() => {
          dispatch(addToast(notification))
          shownToasts.add(notification.id)
          localStorage.setItem(shownToastsKey, JSON.stringify(Array.from(shownToasts)))
        }, i * 1000)
      }
    })

    return notificationsWithState
  }
)

export const fetchNotifications = updateNotificationsFromExchanges

// Отметить все как прочитанные
export const markAllAsRead = createAsyncThunk(
  'notifications/markAllRead',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const userId = state.user.user?.id

      if (!userId) throw new Error('User not found')

      await markAllNotificationsAsReadApi()

      const currentUser = state.user.user
      if (currentUser?.notifications) {
        const updatedNotifications = currentUser.notifications.map((n) => ({ ...n, isRead: true }))
        dispatch(updateUserNotifications(updatedNotifications))

        saveNotifications(userId, updatedNotifications)
        saveReadStatuses(userId, updatedNotifications)
      }
      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка'
      return rejectWithValue(errorMessage)
    }
  }
)

// Очистить прочитанные
export const clearReadNotifications = createAsyncThunk(
  'notifications/clearRead',
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState
      const userId = state.user.user?.id
      if (!userId) throw new Error('User not found')

      await clearReadNotificationsApi()

      const currentUser = state.user.user
      if (currentUser?.notifications) {
        const updatedNotifications = currentUser.notifications.filter((n) => !n.isRead)
        dispatch(updateUserNotifications(updatedNotifications))

        saveNotifications(userId, updatedNotifications)
        saveReadStatuses(userId, updatedNotifications)
      }

      return true
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Произошла ошибка'
      return rejectWithValue(errorMessage)
    }
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TNotification>) => {
      const notification = action.payload
      const toastId = `toast_${notification.id}_${Date.now()}`
      const message = `${notification.user} ${notification.text}`

      const exists = state.activeToasts.some((toast) => toast.notificationId === notification.id)

      if (!exists) {
        state.activeToasts.push({
          id: toastId,
          message,
          notificationId: notification.id,
        })
      }
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.activeToasts = state.activeToasts.filter((toast) => toast.id !== action.payload)
    },
    clearAllToasts: (state) => {
      state.activeToasts = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки уведомлений'
      })
  },
})

export const { addToast, removeToast, clearAllToasts } = notificationsSlice.actions

const selectUserNotifications = (state: RootState) => state.user.user?.notifications || []
export const selectNotifications = selectUserNotifications

export const selectHasUnread = createSelector([selectUserNotifications], (notifications) =>
  notifications.some((n) => !n.isRead)
)

export const selectUnreadNotifications = createSelector(
  [selectUserNotifications],
  (notifications) => notifications.filter((n) => !n.isRead)
)

export const selectReadNotifications = createSelector([selectUserNotifications], (notifications) =>
  notifications.filter((n) => n.isRead)
)

export const selectActiveToasts = (state: RootState) => state.notifications.activeToasts

export const notificationsReducer = notificationsSlice.reducer
