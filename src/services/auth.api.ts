import type { TNotification, TRegisterData, TUpdateData, TUser } from '@utils/types'

import { apiClient } from './axios-instance'

// Функции для авторизации (логин, рефреш, логаут)

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

export type TNotificationsErrorResponse = {
  success: false
  message: string
  code: string
}

export type TNotificationsResponse = TNotificationsSuccessResponse | TNotificationsErrorResponse

export type TRefreshSuccessResponse = {
  success: true
  accessToken: string
}

export type TRefreshResponse = TRefreshSuccessResponse | TApiErrorResponse

export type TLogoutSuccessResponse = {
  success: true
}

export type TLogoutResponse = TLogoutSuccessResponse | TApiErrorResponse

export const loginUserApi = (data: TLoginData) =>
  apiClient.post<TLoginResponse>('/auth/login', data).then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })

// добавила withCredentials: true на случай, если запрос пойдет на другой домен, чтобы добавлял куки
export const refreshUserApi = () =>
  apiClient
    .post<TRefreshResponse>('/auth/refresh', null, { withCredentials: true })
    .then((response) => {
      if (response.data.success) {
        return response.data
      }
      return Promise.reject(response.data)
    })

// добавила withCredentials: true на случай, если запрос пойдет на другой домен, чтобы добавлял куки
export const logoutUserApi = () =>
  apiClient
    .post<TLogoutResponse>('/auth/logout', null, { withCredentials: true })
    .then((response) => {
      if (response.data.success) {
        return response.data
      }
      return Promise.reject(response.data)
    })

export type TUserSuccessResponse = {
  success: true
  user: TUser
}

export type TUserResponse = TUserSuccessResponse | TApiErrorResponse

export const getUserApi = () =>
  apiClient.get<TUserResponse>('/auth/user').then((response) => {
    if (response.data.success) {
      return response.data.user
    }
    return Promise.reject(response.data)
  })

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

export type TRegisterSuccessResponse = {
  success: true
  accessToken: string
  user: TUser
}

export type TRegisterResponse = TRegisterSuccessResponse | TApiErrorResponse

export const registerUserApi = (data: TRegisterData) =>
  apiClient.post<TRegisterResponse>('/auth/register', data).then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })

export type TUpdateSuccessResponse = {
  success: true
  user: TUser
}

export type TUpdateResponse = TUpdateSuccessResponse | TApiErrorResponse

export const updateUserApi = (data: TUpdateData) =>
  apiClient.patch<TUpdateResponse>('/auth/user', data).then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })

export type TCheckEmailSuccessResponse = {
  success: true
}
export type TCheckEmailResponse = TCheckEmailSuccessResponse | TApiErrorResponse

export const checkEmailApi = (email: string) =>
  apiClient.post<TCheckEmailResponse>('/auth/check-email', { email }).then((response) => {
    if (response.data.success) {
      return true
    }
    return Promise.reject(response.data)
  })
