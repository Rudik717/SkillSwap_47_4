// Инициализация сессии при старте - случай, когда пользователь
// перегрузил приложение и access токен сбросился
import { authChecked, getUserWithToken } from '@/store/user-slice'

import { store } from '../store/root'
import { refreshUserApi } from './auth.api'
import { deleteAccessToken, setAccessToken } from './token-manager'

// защита от двух запросов - изза strict mode
let isInitializing = false

export const initSession = async () => {
  if (isInitializing) return
  isInitializing = true
  try {
    const response = await refreshUserApi()
    setAccessToken(response.accessToken)
    await store.dispatch(getUserWithToken()).unwrap()
  } catch {
    deleteAccessToken()
    store.dispatch(authChecked())
  } finally {
    isInitializing = false
  }
}
