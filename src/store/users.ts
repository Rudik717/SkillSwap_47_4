import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { getUsersApi } from '../utils/api'
import type { TUser } from '../utils/types'
import { getAllCities } from './cities'
import { getFilterState } from './filter'

type UsersState = {
  users: TUser[]
  loading: boolean
  error: string | null
}

type RootState = {
  users: UsersState
}

const initialState: UsersState = {
  users: [],
  loading: true,
  error: null,
}

export const getUsers = createAsyncThunk<{ users: TUser[] }, void>('users/getAll', getUsersApi)

const safeArray = <T>(arr: T[] | undefined | null): T[] => (Array.isArray(arr) ? arr : [])

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Unknown error'
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = safeArray(action.payload.users)
      })
  },
})

export const getUsersState = (state: RootState) => state.users

export const getAllUsers = (state: RootState) => safeArray(state.users?.users)

export const getUser = (state: RootState, id?: string) => {
  const users = safeArray(state.users?.users)
  const user = users.find((user) => user.id === id)

  return {
    loading: state.users?.loading ?? false,
    user,
  }
}

// ================= HELPERS =================

const excludeCurrentUser = (users: TUser[], currentUserId?: string) =>
  currentUserId ? users.filter((u) => u.id !== currentUserId) : users

// ================= SELECTORS =================

export const popularUsersSelector = createSelector(
  getUsersState,
  (_: RootState, currentUserId?: string) => currentUserId,
  (state, currentUserId) => {
    const users = excludeCurrentUser(safeArray(state.users), currentUserId)

    return [...users].sort((a, b) => (a.likes ?? 0) - (b.likes ?? 0)).slice(0, 3)
  }
)

export const newUsersSelector = createSelector(
  getUsersState,
  (_: RootState, currentUserId?: string) => currentUserId,
  (state, currentUserId) => {
    const users = excludeCurrentUser(safeArray(state.users), currentUserId)

    return [...users]
      .sort((a, b) => new Date(a.createdAt ?? 0).getTime() - new Date(b.createdAt ?? 0).getTime())
      .slice(0, 3)
  }
)

export const recommendedUsersSelector = createSelector(
  getUsersState,
  (_: RootState, currentUserId?: string) => currentUserId,
  (state, currentUserId) => {
    const users = excludeCurrentUser(safeArray(state.users), currentUserId)

    return users.slice(0, 9)
  }
)

export const similarUsersSelector = createSelector(
  recommendedUsersSelector,
  (_: RootState, __?: string, excludeUserId?: string) => excludeUserId,
  (users, excludeUserId) => {
    const safe = safeArray(users)
    if (!excludeUserId) return safe

    return safe.filter((u) => u.id !== excludeUserId)
  }
)

export const filteredUsersSelector = createSelector(
  getUsersState,
  (_: RootState, currentUserId?: string) => currentUserId,
  getFilterState,
  getAllCities,
  (usersState, currentUserId, filter, cities) => {
    let filtered = excludeCurrentUser(safeArray(usersState.users), currentUserId)
    const safeCities = safeArray(cities)

    if (filter.gender !== 'any') {
      filtered = filtered.filter((user) => user.gender && user.gender === filter.gender)
    }

    if (filter.cities.length) {
      const filterCityNames = safeCities
        .filter(({ id }) => filter.cities.includes(id))
        .map(({ name }) => name)

      filtered = filtered.filter((user) => user.city && filterCityNames.includes(user.city))
    }

    if (filter.role !== 'all') {
      filtered = filtered.filter((user) => {
        if (filter.role === 'teach') {
          return user.skills?.some((s) => s.type === 'teach') ?? false
        }

        if (filter.role === 'learn') {
          return user.skills?.some((s) => s.type === 'learn') ?? false
        }

        return true
      })
    }

    if (filter.subcategories.length) {
      filtered = filtered.filter((user) => {
        if (filter.role === 'all') {
          return (
            user.skills?.some((skill) => filter.subcategories.includes(skill.subcategory)) ?? false
          )
        }

        return (
          user.skills?.some(
            (skill) =>
              filter.subcategories.includes(skill.subcategory) && skill.type === filter.role
          ) ?? false
        )
      })
    }

    if (filter.search.trim()) {
      const query = filter.search.trim().toLowerCase()

      filtered = filtered.filter((user) => {
        const inName = user.name?.toLowerCase().includes(query) ?? false
        const inCity = user.city?.toLowerCase().includes(query) ?? false
        const inAbout = user.about?.toLowerCase().includes(query) ?? false

        const inSkills =
          user.skills?.some((skill) => {
            const titleMatch = skill.title.toLowerCase().includes(query)
            const descMatch = skill.description?.toLowerCase().includes(query) ?? false
            const categoryMatch = skill.category.toLowerCase().includes(query)
            const subcategoryMatch = skill.subcategory.toLowerCase().includes(query)

            return titleMatch || descMatch || categoryMatch || subcategoryMatch
          }) ?? false

        return inName || inCity || inAbout || inSkills
      })
    }

    const { by, direction } = filter.sort

    filtered = [...filtered].sort((a, b) => {
      const aVal = by === 'likes' ? (a.likes ?? 0) : new Date(a.createdAt ?? 0).getTime()

      const bVal = by === 'likes' ? (b.likes ?? 0) : new Date(b.createdAt ?? 0).getTime()

      return direction === 'asc' ? aVal - bVal : bVal - aVal
    })

    return filtered
  }
)

export const usersReducer = usersSlice.reducer
