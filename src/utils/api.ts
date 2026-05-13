import {
  type TCategory,
  type TCity,
  type TNotification,
  type TSubcategory,
  type TUser,
} from './types'

const URL = import.meta.env.VITE_API_URL || '/api'

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err))

type TServerResponse<T> = {
  success: boolean
} & T

type TCategoriesResponse = TServerResponse<{
  data: {
    categories: TCategory[]
    subcategories: TSubcategory[]
  }
}>

export const getCategoriesApi = () =>
  fetch(`${URL}/categories`)
    .then((res) => checkResponse<TCategoriesResponse>(res))
    .then((data) => {
      if (data?.success) return data.data
      return Promise.reject(data)
    })

type TCitiesResponse = TServerResponse<{
  data: {
    cities: TCity[]
  }
}>

export const getCitiesApi = () =>
  fetch(`${URL}/cities`)
    .then((res) => checkResponse<TCitiesResponse>(res))
    .then((data) => {
      if (data?.success) return data.data
      return Promise.reject(data)
    })

type TUsersResponse = TServerResponse<{
  data: {
    users: TUser[]
  }
}>

export const getUsersApi = () =>
  fetch(`${URL}/users`)
    .then((res) => checkResponse<TUsersResponse>(res))
    .then((data) => {
      if (data?.success) return data.data
      return Promise.reject(data)
    })

type TNotificationsResponse = TServerResponse<{
  data: {
    notifications: TNotification[]
  }
}>

export const getNotificationsApi = (userId: string) =>
  fetch(`${URL}/users/${userId}/notifications`, {
    credentials: 'include', // Добавляем cookies для авторизации
  })
    .then((res) => checkResponse<TNotificationsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data.notifications
      return Promise.reject(data)
    })

export const markAllNotificationsAsReadApi = () =>
  fetch(`${URL}/notifications/mark-read`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return true
      return Promise.reject(data)
    })

export const clearReadNotificationsApi = () =>
  fetch(`${URL}/notifications/clear-read`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return true
      return Promise.reject(data)
    })
