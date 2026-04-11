// __tests__/authorization.tests.ts
import { getUserWithToken, loginUser, logoutUser, userSlice } from '@/store/user-slice'
import type { TUser } from '@/utils'
import { describe, expect, it, jest } from '@jest/globals'

// Мокаем зависимости, которые вызывают ошибку с import.meta
jest.mock('@/services/axios-instance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/services/auth.api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  logoutUserApi: jest.fn(),
  getUserApi: jest.fn(),
}))

jest.mock('@/services/token-manager', () => ({
  getAccessToken: jest.fn(),
  setAccessToken: jest.fn(),
  deleteAccessToken: jest.fn(),
}))

type UserState = {
  user: TUser | null
  isAuthChecked: boolean
  loading: boolean
  error: string | null
}

const mockUser: TUser = {
  id: '1',
  name: 'Иван Петров',
  email: 'ivan.petrov@example.com',
  birthDate: '1990-05-15',
  gender: 'male',
  city: 'Санкт-Петербург',
  avatar: '',
  about: '',
  createdAt: '2025-01-15T10:30:00Z',
  updatedAt: '2025-03-30T15:20:00Z',
  favorites: [],
  likes: 0,
  skills: [],
}

describe('userSlice', () => {
  const { reducer } = userSlice
  const initialState: UserState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null,
  }

  it('Тест возврата при создании initial state', () => {
    const state = reducer(undefined, { type: 'unknown' })
    expect(state).toEqual(initialState)
  })

  it('Тест выхода из системы [logoutUser.fulfilled]', () => {
    const state = reducer({ ...initialState, user: mockUser }, logoutUser.fulfilled(undefined, ''))
    expect(state.user).toBe(null)
    expect(state.isAuthChecked).toBe(true)
    expect(state.loading).toBe(false)
  })

  describe('Тесты loginUser', () => {
    it('Тест loginUser.pending - устанавливает loading', () => {
      const state = reducer(initialState, loginUser.pending('', { email: '', password: '' }))
      expect(state.loading).toBe(true)
      expect(state.error).toBe(null)
    })

    it('Тест loginUser.fulfilled - сохраняет пользователя', () => {
      const state = reducer(
        initialState,
        loginUser.fulfilled(mockUser, '', { email: '', password: '' })
      )
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthChecked).toBe(true)
      expect(state.loading).toBe(false)
    })

    it('Тест loginUser.rejected - сохраняет ошибку', () => {
      const state = reducer(
        initialState,
        loginUser.rejected(new Error('Invalid credentials'), '', { email: '', password: '' })
      )
      expect(state.error).toBe('Ошибка входа')
      expect(state.isAuthChecked).toBe(true)
      expect(state.loading).toBe(false)
    })
  })

  describe('Тесты getUserWithToken', () => {
    it('Тест getUserWithToken.pending - устанавливает loading', () => {
      const state = reducer(initialState, getUserWithToken.pending(''))
      expect(state.loading).toBe(true)
    })

    it('Тест getUserWithToken.fulfilled - загружает пользователя', () => {
      const state = reducer(initialState, getUserWithToken.fulfilled(mockUser, ''))
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthChecked).toBe(true)
      expect(state.loading).toBe(false)
    })

    it('Тест getUserWithToken.rejected - не очищает пользователя при ошибке', () => {
      const state = reducer(
        { ...initialState, user: mockUser },
        getUserWithToken.rejected(new Error('Invalid token'), '')
      )
      expect(state.user).toEqual(mockUser)
      expect(state.isAuthChecked).toBe(true)
      expect(state.loading).toBe(false)
    })
  })

  describe('Тесты logoutUser', () => {
    it('Тест logoutUser.pending - устанавливает loading', () => {
      const state = reducer({ ...initialState, user: mockUser }, logoutUser.pending(''))
      expect(state.loading).toBe(true)
    })

    it('Тест logoutUser.rejected - сохраняет ошибку', () => {
      const state = reducer(
        { ...initialState, user: mockUser },
        logoutUser.rejected(new Error('Logout failed'), '')
      )
      expect(state.error).toBe('Logout failed')
      expect(state.loading).toBe(false)
    })
  })
})
