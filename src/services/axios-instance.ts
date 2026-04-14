// Настроенный экземпляр axios
import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

import { refreshUserApi } from './auth.api'
import { deleteAccessToken, getAccessToken, setAccessToken } from './token-manager'

// Флаг, идет ли уже в данный момент обновление токенов - refreshUserApi()
let isRefreshing = false
// массив - очередь запросов, которые будут ждать когда завершится первый refreshUserApi()
let promiseQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, - пропишу только нужным запросам (в нашем проекте итак один домен, поэтому можно без него)
})

// Request interceptor - перехватывает все запросы (добавляет access token в заголовок Authorization ко всем запросам,
// если токен существует. Публичные эндпоинты его проигнорируют.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken()
    // добавляю проверку случая, если headers не инициализирован
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - перехватываем все ответы от сервера и смотрим, какая пришла ошибка по коду
// в error.config — информация о том, какой запрос нужно будет повторить
apiClient.interceptors.response.use(
  // ответ от сервера - успех - пропускаем
  (response) => response,
  // ошибка - смотрим код - обрабатываем случай 401 (ошибка авторизации)
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const errorCode = error.response?.data?.code
      // если access токен просто истек
      if (errorCode === 'TOKEN_EXPIRED') {
        // проверяем флаг - если true - уже идет обновление
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            // Здесь мы сохраняем объект функций resolve и reject, чтобы вызвать их потом
            promiseQueue.push({
              resolve: (token: string) => {
                const queueRequest = error.config
                // аналогично добавляем обработку undefined
                if (!queueRequest?.headers) {
                  reject(error)
                  return
                }
                queueRequest.headers.Authorization = `Bearer ${token}`
                resolve(apiClient(queueRequest))
              },
              reject: (error: unknown) => reject(error),
            })
          })
        }
        isRefreshing = true
        try {
          // если пришли несколько ответов от сервера - то это первый
          const bodyResponse = await refreshUserApi()
          // достаем новый токен и сохраняем в переменную
          const accesstoken = bodyResponse.accessToken
          setAccessToken(accesstoken)
          // повторяем это запрос с новым полученным access токеном
          // достаем запрос из ошибки и добавляем ему в заголовок access токен
          // тоже добавляю проверку на undefined
          if (!originalRequest || !originalRequest.headers) {
            return Promise.reject(error)
          }
          originalRequest.headers.Authorization = `Bearer ${accesstoken}`
          // Отправляем этот первым запросом заново и возвращаем результат
          const firstResult = await apiClient(originalRequest)
          // запускаем остальные запросы заново
          promiseQueue.forEach((item) => item.resolve(accesstoken))
          promiseQueue = []
          isRefreshing = false

          return firstResult
        } catch (refreshError) {
          promiseQueue.forEach((item) => item.reject(refreshError))
          promiseQueue = []
          isRefreshing = false
          // обработка случаев status false - удаляем токен
          deleteAccessToken()

          const authError = new Error('Authentication required')
          authError.name = 'AuthError'
          authError.cause = refreshError // сохраняем исходную ошибку тоже

          return Promise.reject(authError)
        }
      } else if (errorCode === 'INVALID_CREDENTIALS') {
        // случай - неверный логин и пароль из нашего мока
        return Promise.reject(error)
      } else {
        // Все остальные 401 (NO_TOKEN, INVALID_TOKEN, USER_NOT_FOUND, SESSION_NOT_FOUND, INVALID_REFRESH_TOKEN)
        deleteAccessToken()
        const authError = new Error('Authentication required')
        authError.name = 'AuthError'
        authError.cause = error
        return Promise.reject(authError)
      }
    }
    return Promise.reject(error)
  }
)
