import { apiClient } from './axios-instance'

// Функции для авторизации (логин, рефреш, логаут)

export type TLoginData = {
  email: string
  password: string
}

export const loginUserApi = (data: TLoginData) =>
  apiClient.post('/auth/login', data).then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })

export const refreshUserApi = () =>
  apiClient.post('/auth/refresh').then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })

export const logoutUserApi = () =>
  apiClient.post('/auth/logout').then((response) => {
    if (response.data.success) {
      return response.data
    }
    return Promise.reject(response.data)
  })
