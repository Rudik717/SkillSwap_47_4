import { type TCity, getCitiesApi } from '@/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type CitiesState = {
  cities: TCity[]
  loading: boolean
  error: string | null
}

type RootState = {
  cities: CitiesState
}

const initialState: CitiesState = {
  cities: [],
  loading: true,
  error: null,
}

export const getCities = createAsyncThunk('cities/getAll', async () => getCitiesApi())

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCities.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false
        state.cities = action.payload.cities
      })
  },
})

export const getCitiesState = (state: RootState) => state.cities
export const getAllCities = (state: RootState) => state.cities.cities

export const citiesReducer = citiesSlice.reducer
