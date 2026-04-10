import type { TNotification, TToast } from '@/utils'
import {
  clearReadNotificationsApi,
  getNotificationsApi,
  markAllNotificationsAsReadApi,
} from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

// Загрузка уведомлений с сервера
export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (userId: string, { dispatch, getState }) => {
    const response = await getNotificationsApi(userId)

    dispatch(updateUserNotifications(response))

    // Создаем тосты для непрочитанных уведомлений
    for (let i = 0; i < response.length; i++) {
      const notification = response[i]
      if (!notification.isRead) {
        const state = getState() as RootState
        const hasToast = state.notifications.activeToasts.some(
          (toast) => toast.notificationId === `${notification.user}_${notification.id}`
        )
        if (!hasToast) {
          setTimeout(() => {
            dispatch(addToast(notification))
          }, i * 1000)
        }
      }
    }

    return response
  }
)

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
      }
      return true
    } catch (error) {
      return rejectWithValue(error.message)
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
      }

      return true
    } catch (error) {
      return rejectWithValue(error.message)
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

      state.activeToasts.push({
        id: toastId,
        message,
        notificationId: notification.id,
      })

      setTimeout(() => {
        state.activeToasts = state.activeToasts.filter((t) => t.id !== toastId)
      }, 5000)
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

export const selectNotifications = (state: RootState) => state.user.user?.notifications || []
export const selectHasUnread = (state: RootState) =>
  state.user.user?.notifications?.some((n) => !n.isRead) || false
export const selectUnreadNotifications = (state: RootState) =>
  state.user.user?.notifications?.filter((n) => !n.isRead) || []
export const selectReadNotifications = (state: RootState) =>
  state.user.user?.notifications?.filter((n) => n.isRead) || []
export const selectActiveToasts = (state: RootState) => state.notifications.activeToasts

export const notificationsReducer = notificationsSlice.reducer
