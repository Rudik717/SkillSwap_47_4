import {
  getUserApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi,
  updateUserApi,
} from '@/services/auth.api'
import type { TLoginData } from '@/services/auth.api'
import { deleteAccessToken, getAccessToken, setAccessToken } from '@/services/token-manager'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import type { TUpdateData } from '@utils/types'
import type { TNotification, TRegisterData, TUser } from '@utils/types'

export type TUserState = {
  user: TUser | null
  isAuthChecked: boolean
  loading: boolean
  error: string | null
}

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
}

// Сохраняем favorites в localStorage
export const saveFavorites = (userId: string, favorites: string[]) => {
  localStorage.setItem(`favorites_${userId}`, JSON.stringify(favorites))
}

// Загружаем favorites при старте приложения
export const loadFavorites = (userId: string): string[] => {
  const stored = localStorage.getItem(`favorites_${userId}`)
  return stored ? JSON.parse(stored) : []
}

// Сохраняем requests в localStorage
export const saveRequests = (userId: string, requests: string[]) => {
  localStorage.setItem(`requests_${userId}`, JSON.stringify(requests))
}

// Загружаем requests при старте приложения
export const loadRequests = (userId: string): string[] => {
  const stored = localStorage.getItem(`requests_${userId}`)
  return stored ? JSON.parse(stored) : []
}

//Логин пользователя  - вводит данные - запрос на сервер - получаем юзера
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data)
      setAccessToken(response.accessToken)
      return response.user
    } catch (err) {
      const errorData = (err as AxiosError)?.response?.data
      // Передаём их в rejected с помощью rejectWithValue
      return rejectWithValue(errorData || { message: 'Ошибка входа' })
    }
  }
)

//Регистрация пользователя  - вводит данные - запрос на сервер - получаем юзера
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data)
      setAccessToken(response.accessToken)
      return response.user
    } catch (err) {
      const errorData = (err as AxiosError)?.response?.data
      // Передаём их в rejected с помощью rejectWithValue
      return rejectWithValue(errorData || { message: 'Ошибка входа' })
    }
  }
)

// Обновление данных пользователя  - вводит данные - запрос на сервер - получаем юзера
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TUpdateData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data)
      return response.user
    } catch (err) {
      const errorData = (err as AxiosError)?.response?.data
      // Передаём их в rejected с помощью rejectWithValue
      return rejectWithValue(errorData || { message: 'Ошибка обновления' })
    }
  }
)

//выход пользователя - браузер сам удалить refresh, удаляем access
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutUserApi()
  deleteAccessToken()
})

//запрос на сервер с токеном - получаем юзера или ошибку, если оба токена истекли
export const getUserWithToken = createAsyncThunk(
  'user/getUserWithToken',
  async (_, { dispatch }) => {
    const token = getAccessToken()

    if (!token) {
      dispatch(authChecked())
      return null
    }
    try {
      const response = await getUserApi()
      return response
    } catch (error) {
      dispatch(authChecked())
      throw error
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true
    },
    updateUserNotifications: (state, action: PayloadAction<TNotification[]>) => {
      if (state.user) {
        state.user.notifications = action.payload
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      if (state.user?.notifications) {
        const notification = state.user.notifications.find((n) => n.id === action.payload)
        if (notification) {
          notification.isRead = true
        }
      }
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
      state.user.favorites = loadFavorites(action.payload.id)
      state.user.requests = loadRequests(action.payload.id)
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (!state.user) return
      if (!state.user.favorites) state.user.favorites = []

      const likedUserId = action.payload
      const index = state.user.favorites.indexOf(likedUserId)

      if (index > -1) state.user.favorites.splice(index, 1)
      else state.user.favorites.push(likedUserId)

      saveFavorites(state.user.id, state.user.favorites)
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true
        state.loading = false
        const errorData = action.payload as { message?: string }
        state.error = errorData?.message || 'Ошибка входа'
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload
        state.isAuthChecked = true
        state.loading = false
      })
      //registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true
        state.loading = false
        const errorData = action.payload as { message?: string }
        state.error = errorData?.message || 'Ошибка регистрации'
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload
        state.isAuthChecked = true
        state.loading = false
      })
      //updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        const errorData = action.payload as { message?: string }
        state.error = errorData?.message || 'Ошибка обновления данных'
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload
        state.loading = false
      })
      //logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isAuthChecked = true
        state.loading = false
        state.error = action.error.message ?? null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthChecked = true
        state.loading = false
      })
      //getUserWithToken
      .addCase(getUserWithToken.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserWithToken.rejected, (state) => {
        state.isAuthChecked = true
        state.loading = false
      })
      .addCase(getUserWithToken.fulfilled, (state, action: PayloadAction<TUser | null>) => {
        state.user = action.payload
        state.isAuthChecked = true
        state.loading = false
      })
  },
})

export const {
  authChecked,
  updateUserNotifications,
  markNotificationAsRead,
  setUser,
  toggleFavorite,
  clearError,
} = userSlice.actions
export const userSliceReducer = userSlice.reducer
