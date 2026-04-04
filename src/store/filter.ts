import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import type { TGender, TRole } from '../utils/types'

type FilterState = {
  role: TRole
  subcategories: string[]
  gender: TGender
  cities: string[]
  search: string
}

type RootState = {
  filter: FilterState
}

const initialState: FilterState = {
  role: 'all',
  subcategories: [],
  gender: 'any',
  cities: [],
  search: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<TRole>) {
      state.role = action.payload
    },
    setSubcategories(state, action: PayloadAction<string[]>) {
      state.subcategories = action.payload
    },
    setGender(state, action: PayloadAction<TGender>) {
      state.gender = action.payload
    },
    setCities(state, action: PayloadAction<string[]>) {
      state.cities = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    resetFilter(state) {
      state.role = 'all'
      state.subcategories = []
      state.gender = 'any'
      state.cities = []
      state.search = ''
    },
  },
})

export const getFilterState = (state: RootState) => state.filter

export const isFilterActiveSelector = createSelector(getFilterState, (state) => {
  const { cities, subcategories, role, gender, search } = state

  return Boolean(
    cities.length ||
    subcategories.length ||
    role !== 'all' ||
    gender !== 'any' ||
    search.trim().length
  )
})

export const filterCountSelector = createSelector(getFilterState, (state) => {
  const { cities, subcategories, role, gender } = state

  let count = 0

  if (role !== 'all') count += 1
  if (gender !== 'any') count += 1

  count += cities.length
  count += subcategories.length

  return count
})

export const filterReducer = filterSlice.reducer
export const { setRole, setSubcategories, setGender, setCities, setSearch, resetFilter } =
  filterSlice.actions
