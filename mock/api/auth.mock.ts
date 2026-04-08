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
    response: (req, res) => {
      const { email, password } = req.body

      // нет логина и пароля
      if (!email || !password) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'Email and password are required',
            code: 'VALIDATION_ERROR',
          })
        )
        return
      }

      // Ищем пользователя с таким email и паролем
      const user = users.find((user) => user.email === email && user.password === password)

      // Если не нашли — ошибка - неверный логин и пароль
      if (!user) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'Invalid email or password',
            code: 'INVALID_CREDENTIALS',
          })
        )
        return
      }

      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken()

      refreshSessions.set(refreshToken, user.id)

      res.statusCode = 200
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${refreshToken}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax`
      )
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: true,
          accessToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
        })
      )
    },
  },
  {
    url: '/api/auth/refresh',
    method: 'POST',
    response: (req, res) => {
      const refreshToken = getCookieFromRequest(req, 'refreshToken')

      // Проверяем, есть ли токен
      if (!refreshToken) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'No refresh token',
            code: 'INVALID_REFRESH_TOKEN',
          })
        )
        return
      }

      // Проверяем, есть ли refresh токен в запросе и действителен ли он
      // Если токена нет или он не найден в хранилище — возвращаем ошибку 401
      if (!refreshToken || !refreshSessions.has(refreshToken)) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'Invalid refresh token',
            code: 'INVALID_REFRESH_TOKEN',
          })
        )
        return
      }

      const userId = refreshSessions.get(refreshToken)

      if (!userId) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'Session not found',
            code: 'SESSION_NOT_FOUND',
          })
        )
        return
      }
      const user = users.find((user) => user.id === userId)

      // пользователь не найден
      if (!user) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          })
        )
        return
      }

      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken()

      // Ротация
      refreshSessions.set(newRefreshToken, userId)
      refreshSessions.delete(refreshToken)

      res.statusCode = 200
      res.setHeader(
        'Set-Cookie',
        `refreshToken=${newRefreshToken}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax`
      )
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: true,
          accessToken: newAccessToken,
        })
      )
    },
  },
  {
    url: '/api/auth/logout',
    method: 'POST',
    response: (req, res) => {
      // Достаем refreshToken из cookie запроса
      const refreshToken = getCookieFromRequest(req, 'refreshToken')
      // Если токен есть — удаляем его из хранилища
      if (refreshToken) {
        refreshSessions.delete(refreshToken)
      }
      // Возвращаем успешный ответ
      res.statusCode = 200
      res.setHeader(
        'Set-Cookie',
        `refreshToken=; HttpOnly; Path=/api/auth; Max-Age=0; SameSite=Lax`
      )
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: true,
        })
      )
    },
  },
  {
    // для проверки истек ли access token - имитация случаев всех защищенных запросов - потом скопирую этот кусок
    // со стороны фронтенда буду добавлять при каждом защищенном запросе доставать access token из переменной,
    // и добавлять в заголовок Authorization перехватчиком interceptors
    // Защищенный эндпойнт - данные залогиненного юзера.
    url: '/api/auth/user',
    method: 'GET',
    response: (req, res) => {
      // читаю заголовок
      const authHeader = req.headers.authorization
      // извлекаю access токен
      const accessToken = authHeader?.replace('Bearer ', '')

      // токена нет
      if (!accessToken) {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'No token',
            code: 'NO_TOKEN',
          })
        )
        return
      }

      try {
        // проверяем не истек ли токен - достаю вторую часть токену между точками
        const payload = JSON.parse(base64Decode(accessToken.split('.')[1]))
        if (payload.exp * 1000 < Date.now()) {
          res.statusCode = 401
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              success: false,
              message: 'Token expired',
              code: 'TOKEN_EXPIRED',
            })
          )
          return
        }

        // достаю юзера из токена - проверяю есть ли он в нашей БД
        const user = users.find((user) => user.id === payload.userId)
        // юзер не найден
        if (!user) {
          res.statusCode = 401
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              success: false,
              message: 'User not found',
              code: 'USER_NOT_FOUND',
            })
          )
          return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: true,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              birthDate: user.birthDate,
              city: user.city,
              about: user.about,
              skills: user.skills,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          })
        )
      } catch {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            success: false,
            message: 'Invalid token',
            code: 'INVALID_TOKEN',
          })
        )
      }
    },
  },
])
