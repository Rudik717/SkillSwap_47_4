import { type TUser, getUsersApi } from '@/utils'
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

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
  name: 'cities',
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

export const filteredUsersSelector = createSelector([getUsersState], (state) => {
  const { users } = state

  return users.slice(0, 9)
})

export const usersReducer = usersSlice.reducer
