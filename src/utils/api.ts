import { type TCategory, type TSubcategory } from './types'

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
