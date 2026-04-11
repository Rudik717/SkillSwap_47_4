import type { TRegisterData, TUser } from '@utils/types'

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

export const refreshUserApi = () =>
  apiClient.post<TRefreshResponse>('/auth/refresh').then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })

export const logoutUserApi = () =>
  apiClient.post<TLogoutResponse>('/auth/logout').then((response) => {
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
