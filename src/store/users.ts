import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import { getUsersApi } from '../utils/api'
import type { TSkill, TUser } from '../utils/types'
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
        state.users = action.payload.users
      })
  },
})

export const getUsersState = (state: RootState) => state.users
export const getAllUsers = (state: RootState) => state.users.users
export const getUser = (state: RootState, id?: string) => {
  const { loading } = state.users
  const user = state.users.users?.find((user) => user.id === id)
  return { loading, user }
}

export const popularUsersSelector = createSelector(getUsersState, (state) => {
  const { users } = state

  return users
    .toSorted((a, b) => {
      const aLikes = a?.likes ?? 0
      const bLikes = b?.likes ?? 0
      return aLikes - bLikes
    })
    .slice(0, 3)
})

export const newUsersSelector = createSelector(getUsersState, (state) => {
  const { users } = state

  return users
    .toSorted((a, b) => {
      const aCreatedAt = new Date(a?.createdAt).getTime()
      const bCreatedAt = new Date(b?.createdAt).getTime()
      return aCreatedAt - bCreatedAt
    })
    .slice(0, 3)
})

export const recommendedUsersSelector = createSelector(getUsersState, (state) => {
  const { users } = state

  return users.slice(0, 9)
})

export const filteredUsersSelector = createSelector(
  getUsersState,
  getFilterState,
  getAllCities,
  (usersState, filter, cities) => {
    let filtered = usersState.users

    if (filter.gender !== 'any') {
      filtered = filtered.filter((user) => user.gender && user.gender === filter.gender)
    }

    if (filter.cities.length) {
      const filterCityNames = cities
        .filter(({ id }) => filter.cities.includes(id))
        .map(({ name }) => name)
      filtered = filtered.filter((user) => user.city && filterCityNames.includes(user.city))
    }

    if (filter.role !== 'all') {
      filtered = filtered.filter((user) => {
        if (filter.role === 'teach') {
          return user.skills?.some((s: TSkill) => s.type === 'teach') ?? false
        }

        if (filter.role === 'learn') {
          return user.skills?.some((s: TSkill) => s.type === 'learn') ?? false
        }

        return true
      })
    }

    if (filter.subcategories.length) {
      filtered = filtered.filter((user) => {
        if (filter.role === 'all') {
          return (
            user.skills?.some((skill: TSkill) =>
              filter.subcategories.includes(skill.subcategory)
            ) ?? false
          )
        }

        return (
          user.skills?.some(
            (skill: TSkill) =>
              filter.subcategories.includes(skill.subcategory) && skill.type === filter.role
          ) ?? false
        )
      })
    }

    if (filter.search.trim()) {
      const query = filter.search.trim().toLowerCase()

      filtered = filtered.filter((user) => {
        const inName = user.name.toLowerCase().includes(query)
        const inCity = user.city?.toLowerCase().includes(query) ?? false
        const inAbout = user.about?.toLowerCase().includes(query) ?? false

        const inSkills =
          user.skills?.some((skill: TSkill) => {
            const titleMatch = skill.title.toLowerCase().includes(query)
            const descMatch = skill.description?.toLowerCase().includes(query) ?? false
            const categoryMatch = skill.category.toLowerCase().includes(query)
            const subcategoryMatch = skill.subcategory.toLowerCase().includes(query)

            return titleMatch || descMatch || categoryMatch || subcategoryMatch
          }) ?? false

        return inName || inCity || inAbout || inSkills
      })
    }

    return filtered
  }
)

export const usersReducer = usersSlice.reducer
