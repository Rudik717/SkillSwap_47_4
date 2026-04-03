import { type TCategory, type TCity, type TSubcategory, type TUser } from './types'

const URL = import.meta.env.VITE_API_URL

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
