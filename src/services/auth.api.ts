import type { TNotification, TRegisterData, TUpdateData, TUser } from '@utils/types'

import { apiClient } from './axios-instance'

// ======================
// TYPES
// ======================

export type TApiErrorResponse = {
  success: false
  message: string
  code: string
}

export type TLoginData = {
  email: string
  password: string
}

export type TLoginSuccessResponse = {
  success: true
  accessToken: string
  user: TUser
}

export type TLoginResponse = TLoginSuccessResponse | TApiErrorResponse

export type TNotificationsSuccessResponse = {
  success: true
  notifications: TNotification[]
}

export type TNotificationsResponse = TNotificationsSuccessResponse | TApiErrorResponse

export type TRefreshSuccessResponse = {
  success: true
  accessToken: string
}

export type TRefreshResponse = TRefreshSuccessResponse | TApiErrorResponse

export type TLogoutSuccessResponse = {
  success: true
}

export type TLogoutResponse = TLogoutSuccessResponse | TApiErrorResponse

// ======================
// AUTH API (FIXED -> /api/*)
// ======================

export const loginUserApi = (data: TLoginData) =>
  apiClient.post<TLoginResponse>('/api/auth/login', data).then((response) => {
    if (response.data.success) return response.data
    return Promise.reject(response.data)
  })

export const refreshUserApi = () =>
  apiClient
    .post<TRefreshResponse>('/api/auth/refresh', null, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.success) return response.data
      return Promise.reject(response.data)
    })

export const logoutUserApi = () =>
  apiClient
    .post<TLogoutResponse>('/api/auth/logout', null, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.success) return response.data
      return Promise.reject(response.data)
    })

export type TUserSuccessResponse = {
  success: true
  user: TUser
}

export type TUserResponse = TUserSuccessResponse | TApiErrorResponse

export const getUserApi = () =>
  apiClient.get<TUserResponse>('/api/auth/user').then((response) => {
    if (response.data.success) return response.data.user
    return Promise.reject(response.data)
  })

export const registerUserApi = (data: TRegisterData) =>
  apiClient.post<TLoginResponse>('/api/auth/register', data).then((response) => {
    if (response.data.success) return response.data
    return Promise.reject(response.data)
  })

export const updateUserApi = (data: TUpdateData) =>
  apiClient.patch<TUserSuccessResponse>('/api/auth/user', data).then((response) => {
    if (response.data.success) return response.data
    return Promise.reject(response.data)
  })

export const checkEmailApi = (email: string) =>
  apiClient
    .post<TApiErrorResponse | { success: true }>('/api/auth/check-email', {
      email,
    })
    .then((response) => {
      if (response.data.success) return true
      return Promise.reject(response.data)
    })

// ======================
// NOTIFICATIONS
// ======================

export const getNotificationsApi = (userId: string) =>
  apiClient.get<TNotificationsResponse>(`/api/users/${userId}/notifications`).then((response) => {
    if (response.data.success) {
      return response.data.notifications
    }
    return Promise.reject(response.data)
  })

export const markAllNotificationsAsReadApi = () =>
  apiClient
    .post<{ success: true }>('/api/notifications/mark-read')
    .then((response) => response.data)

export const clearReadNotificationsApi = () =>
  apiClient
    .delete<{ success: true }>('/api/notifications/clear-read')
    .then((response) => response.data)
