import type { TUser } from '@/utils'
import { defineMock } from 'vite-plugin-mock-dev-server'

import { data } from './users'
import { base64Decode, base64Encode, generateUUID, getCookieFromRequest } from './utils'

// имитация базы данных залогиненных пользователей на бэкенде - всем делаю одинаковый пароль для простоты
const users = data.users.map((item) => {
  return { ...item, password: '123456' }
})

// имитируем генерацию Access токена - преобразуем объекты в строки для 3 частей - кодируем, отдаем строку в нужном виде
const generateAccessToken = (user: TUser) => {
  const payload = {
    userId: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 15 * 60, // расчет срока жизни токена - 15 минут
  }
  // base64 кодирование (имитация JWT) - btoa() - 3 части, разделенные точками
  const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const encodedPayload = base64Encode(JSON.stringify(payload))
  const fakeSignature = base64Encode('fake-signature-for-mock')

  return `${header}.${encodedPayload}.${fakeSignature}`
}

// имитируем создаение уникального Refresh токена
const generateRefreshToken = () => generateUUID()

// имитируем хранилище выданных Refresh токенов (в бэке БД) Ключ = refreshToken, значение = userId
const refreshSessions = new Map<string, string>()

export default defineMock([
  {
    url: '/api/auth/login',
    method: 'POST',
    body: (req) => {
      const { email, password } = req.body

      // нет логина и пароля
      if (!email || !password) {
        return {
          status: 400,
          body: {
            success: false,
            message: 'Email and password are required',
            code: 'VALIDATION_ERROR',
          },
        }
      }

      // Ищем пользователя с таким email и паролем
      const user = users.find((user) => user.email === email && user.password === password)

      // Если не нашли — ошибка - неверный логин и пароль
      if (!user) {
        return {
          status: 401,
          body: {
            success: false,
            message: 'Invalid email or password',
            code: 'INVALID_CREDENTIALS',
          },
        }
      }

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken()

      refreshSessions.set(refreshToken, user.id)

      return {
        status: 200,
        // записываем refreshToken в куки с заголовком HttpOnly
        headers: {
          'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax`,
        },
        body: {
          success: true,
          accessToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        },
      }
    },
  },
  {
    url: '/api/auth/refresh',
    method: 'POST',
    body: (req) => {
      const refreshToken = getCookieFromRequest(req, 'refreshToken')

      // Проверяем, есть ли refresh токен в запросе и действителен ли он
      // Если токена нет или он не найден в хранилище — возвращаем ошибку 401
      if (!refreshToken || !refreshSessions.has(refreshToken)) {
        return {
          status: 401,
          body: {
            success: false,
            message: 'Invalid refresh token',
            code: 'INVALID_REFRESH_TOKEN',
          },
        }
      }

      const userId = refreshSessions.get(refreshToken)

      if (!userId) {
        return {
          status: 401,
          body: {
            success: false,
            message: 'Session not found',
            code: 'SESSION_NOT_FOUND',
          },
        }
      }
      const user = users.find((user) => user.id === userId)

      // пользователь не найден
      if (!user) {
        return {
          status: 401,
          body: {
            success: false,
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        }
      }

      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken()

      // Ротация
      refreshSessions.delete(refreshToken)
      refreshSessions.set(newRefreshToken, userId)

      return {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=${newRefreshToken}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax`,
        },
        body: {
          success: true,
          accessToken: newAccessToken,
        },
      }
    },
  },
  {
    url: '/api/auth/logout',
    method: 'POST',
    body: (req) => {
      // Достаем refreshToken из cookie запроса
      const refreshToken = getCookieFromRequest(req, 'refreshToken')
      // Если токен есть — удаляем его из хранилища
      if (refreshToken) {
        refreshSessions.delete(refreshToken)
      }
      // Возвращаем успешный ответ
      return {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=; HttpOnly; Path=/api/auth; Max-Age=0; SameSite=Lax`,
        },
        body: {
          success: true,
        },
      }
    },
  },
  {
    // для проверки истек ли access token - имитация случаев всех защищенных запросов
    // со стороны фронтенда буду добавлять при каждом защищенном запросе доставать access token из переменной,
    // и добавлять в заголовок Authorization перехватчиком interceptors
    url: '/api/auth/verify',
    method: 'GET',
    body: (req) => {
      // читаю заголовок
      const authHeader = req.headers.authorization
      // извлекаю access токен
      const accessToken = authHeader?.replace('Bearer ', '')

      // токена нет
      if (!accessToken) {
        return {
          status: 401,
          body: {
            success: false,
            message: 'No token',
            code: 'NO_TOKEN',
          },
        }
      }

      try {
        // проверяем не истек ли токен - достаю вторую часть токену между точками
        const payload = JSON.parse(base64Decode(accessToken.split('.')[1]))
        if (payload.exp * 1000 < Date.now()) {
          return {
            status: 401,
            body: {
              success: false,
              message: 'Token expired',
              code: 'TOKEN_EXPIRED',
            },
          }
        }

        // достаю юзера из токена - проверяю есть ли он в нашей БД
        const user = users.find((user) => user.id === payload.userId)
        // юзер не найден
        if (!user) {
          return {
            status: 401,
            body: {
              success: false,
              message: 'User not found',
              code: 'USER_NOT_FOUND',
            },
          }
        }

        return {
          status: 200,
          body: {
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          },
        }
      } catch {
        return {
          status: 401,
          body: {
            success: false,
            message: 'Invalid token',
            code: 'INVALID_TOKEN',
          },
        }
      }
    },
  },
])
