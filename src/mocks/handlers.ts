/// <reference lib="webworker" />
import type { TUser } from '@/utils'
import { HttpResponse, http } from 'msw'

import { categories as categoriesData } from '../data/categories'
import { cities as citiesData } from '../data/cities'
import { users as usersData } from '../data/users'

// ==================== ТИПЫ ====================
type LoginRequest = {
  email: string
  password: string
}

type UpdateUserRequest = Partial<{
  name: string
  birthDate: string
  gender: string
  city: string
  about: string
  avatar: string
}>

type UserWithPassword = TUser & { password: string }

// ==================== ДАННЫЕ ====================
const users: UserWithPassword[] = usersData.users.map((user: TUser) => ({
  ...user,
  password: '123456',
})) as UserWithPassword[]

const refreshSessions = new Map<string, string>()

// ==================== УТИЛИТЫ ====================
const base64Encode = (str: string): string => btoa(unescape(encodeURIComponent(str)))
const base64Decode = (str: string): string => decodeURIComponent(escape(atob(str)))

const generateUUID = (): string => globalThis.crypto.randomUUID()

const generateAccessToken = (user: TUser): string => {
  const payload = {
    userId: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 15 * 60,
  }

  const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const encodedPayload = base64Encode(JSON.stringify(payload))
  const fakeSignature = base64Encode('fake-signature-for-mock')

  return `${header}.${encodedPayload}.${fakeSignature}`
}

// ==================== HANDLERS ====================
export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequest

    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return HttpResponse.json(
        { success: false, message: 'Invalid email or password', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      )
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateUUID()
    refreshSessions.set(refreshToken, user.id)

    return HttpResponse.json(
      { success: true, accessToken, user },
      {
        headers: {
          'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax`,
        },
      }
    )
  }),

  http.post('/api/auth/refresh', async ({ request }) => {
    const cookie = request.headers.get('cookie')
    const refreshToken = cookie?.match(/refreshToken=([^;]+)/)?.[1]

    if (!refreshToken || !refreshSessions.has(refreshToken)) {
      return HttpResponse.json(
        { success: false, message: 'Invalid refresh token', code: 'INVALID_REFRESH_TOKEN' },
        { status: 401 }
      )
    }

    const userId = refreshSessions.get(refreshToken)
    const user = users.find((u) => u.id === userId)

    if (!user) return HttpResponse.json({ success: false }, { status: 401 })

    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateUUID()

    refreshSessions.set(newRefreshToken, user.id)
    refreshSessions.delete(refreshToken)

    return HttpResponse.json(
      { success: true, accessToken: newAccessToken },
      {
        headers: {
          'Set-Cookie': `refreshToken=${newRefreshToken}; HttpOnly; Path=/api/auth; Max-Age=2592000; SameSite=Lax`,
        },
      }
    )
  }),

  http.post('/api/auth/logout', () => {
    return HttpResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': `refreshToken=; HttpOnly; Path=/api/auth; Max-Age=0; SameSite=Lax`,
        },
      }
    )
  }),

  http.get('/api/auth/user', async ({ request }) => {
    const auth = request.headers.get('authorization')
    const token = auth?.replace('Bearer ', '')

    if (!token) {
      return HttpResponse.json(
        { success: false, message: 'No token', code: 'NO_TOKEN' },
        { status: 401 }
      )
    }

    try {
      const payload = JSON.parse(base64Decode(token.split('.')[1]))
      if (payload.exp * 1000 < Date.now()) {
        return HttpResponse.json(
          { success: false, message: 'Token expired', code: 'TOKEN_EXPIRED' },
          { status: 401 }
        )
      }

      const user = users.find((u) => u.id === payload.userId)
      return user
        ? HttpResponse.json({ success: true, user })
        : HttpResponse.json({ success: false, message: 'User not found' }, { status: 401 })
    } catch {
      return HttpResponse.json(
        { success: false, message: 'Invalid token', code: 'INVALID_TOKEN' },
        { status: 401 }
      )
    }
  }),

  http.patch('/api/auth/user', async ({ request }) => {
    const auth = request.headers.get('authorization')
    const token = auth?.replace('Bearer ', '')
    if (!token) return HttpResponse.json({ success: false }, { status: 401 })

    try {
      const payload = JSON.parse(base64Decode(token.split('.')[1]))
      const userIndex = users.findIndex((u) => u.id === payload.userId)
      if (userIndex === -1) return HttpResponse.json({ success: false }, { status: 401 })

      const body = (await request.json()) as UpdateUserRequest

      users[userIndex] = {
        ...users[userIndex],
        ...body,
        updatedAt: new Date().toISOString(),
      } as UserWithPassword

      return HttpResponse.json({ success: true, user: users[userIndex] })
    } catch {
      return HttpResponse.json({ success: false }, { status: 401 })
    }
  }),

  // Public
  http.get('/api/categories', () =>
    HttpResponse.json({
      success: true,
      data: {
        categories: categoriesData.categories,
        subcategories: categoriesData.subcategories,
      },
    })
  ),

  http.get('/api/cities', () =>
    HttpResponse.json({
      success: true,
      data: {
        cities: citiesData.cities,
      },
    })
  ),

  http.get('/api/users', () =>
    HttpResponse.json({
      success: true,
      data: {
        users: usersData.users,
      },
    })
  ),

  // Notifications
  http.get('/api/users/:userId/notifications', ({ params }) => {
    const user = users.find((u) => u.id === params.userId)
    return HttpResponse.json({
      success: true,
      data: { notifications: user?.notifications || [] },
    })
  }),

  http.post('/api/notifications/mark-read', () => HttpResponse.json({ success: true })),
  http.delete('/api/notifications/clear-read', () => HttpResponse.json({ success: true })),
]
