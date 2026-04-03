import { type TUser, getUsersApi } from '@/utils'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

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
  loading: false,
  error: null,
}

export const getUsers = createAsyncThunk('users/getAll', async () => getUsersApi())

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
        state.error = action.error.message || 'Unknown error'
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload.users
      })
  },
})

export const getUsersState = (state: RootState) => state.users
export const getAllUsers = (state: RootState) => state.users.users

export const popularUsersSelector = createSelector([getUsersState], (state) => {
  const { users } = state

  return users
    .toSorted((a, b) => {
      const aLikes = a?.likes ?? 0
      const bLikes = b?.likes ?? 0
      return aLikes - bLikes
    })
    .slice(0, 3)
})

export const newUsersSelector = createSelector([getUsersState], (state) => {
  const { users } = state

  return users
    .toSorted((a, b) => {
      const aCreatedAt = new Date(a?.createdAt).getTime()
      const bCreatedAt = new Date(b?.createdAt).getTime()
      return aCreatedAt - bCreatedAt
    })
    .slice(0, 3)
})

export const recommendedUsersSelector = createSelector([getUsersState], (state) => {
  const { users } = state

  return users.slice(0, 9)
})

export const filteredUsersSelector = createSelector(
  [getUsersState, getFilterState, getAllCities],
  (usersState, filter, cities) => {
    let filtered = usersState.users

    // Фильтр по полу
    if (filter.gender !== 'any') {
      filtered = filtered.filter((user) => user.gender && user.gender === filter.gender)
    }

    // Фильтр по городам
    if (filter.cities.length) {
      const filterCityNames = cities
        .filter(({ id }) => filter.cities.includes(id))
        .map(({ name }) => name)
      filtered = filtered.filter((user) => user.city && filterCityNames.includes(user.city))
    }

    // Фильтр по роли (через skills)
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

    // Фильтр по подкатегориям
    if (filter.subcategories.length) {
      filtered = filtered.filter((user) =>
        user.skills?.some((skill) => filter.subcategories.includes(skill.subcategory))
      )
    }

    return filtered
  }
)

export const usersReducer = usersSlice.reducer
