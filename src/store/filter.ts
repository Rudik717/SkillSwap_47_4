import { type TGender, type TRole } from '@/utils'
import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

type FilterState = {
  role: TRole
  subcategories: string[]
  gender: TGender
  cities: string[]
}

type RootState = {
  filter: FilterState
}

const initialState: FilterState = {
  role: 'all',
  subcategories: [],
  gender: 'any',
  cities: [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<TRole>) => {
      state.role = action.payload
    },
    setSubcategories: (state, action: PayloadAction<string[]>) => {
      state.subcategories = action.payload
    },
    setGender: (state, action: PayloadAction<TGender>) => {
      state.gender = action.payload
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload
    },
    resetFilter: (state) => {
      state.cities = []
      state.subcategories = []
      state.role = 'all'
      state.gender = 'any'
    },
  },
})

export const getFilterState = (state: RootState) => state.filter

export const isFilterActiveSelector = createSelector([getFilterState], (state) => {
  const { cities, subcategories, role, gender } = state

  return cities.length || subcategories.length || role !== 'all' || gender !== 'any'
})

export const filterCountSelector = createSelector([getFilterState], (state) => {
  const { cities, subcategories, role, gender } = state
  let count = 0

  if (role !== 'all') {
    count++
  }

  if (gender !== 'any') {
    count++
  }

  count += cities.length
  count += subcategories.length

  return count
})

export const filterReducer = filterSlice.reducer
export const { setRole, setSubcategories, setGender, setCities, resetFilter } = filterSlice.actions
