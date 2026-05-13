import { type TCategory, type TSubcategory, getCategoriesApi } from '@/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type CategoriesState = {
  categories: TCategory[]
  subcategories: TSubcategory[]
  loading: boolean
  error: string | null
}

type RootState = {
  categories: CategoriesState
}

const initialState: CategoriesState = {
  categories: [],
  subcategories: [],
  loading: true,
  error: null,
}

const safeArray = <T>(arr: T[] | undefined | null): T[] => (Array.isArray(arr) ? arr : [])

export const getCategories = createAsyncThunk<
  {
    categories: TCategory[]
    subcategories: TSubcategory[]
  },
  void
>('categories/getAll', getCategoriesApi)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Unknown error'
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false

        state.categories = safeArray(action.payload?.categories)

        state.subcategories = safeArray(action.payload?.subcategories)
      })
  },
})

export const getCategoriesState = (state: RootState) => state.categories

export const getAllCategories = (state: RootState) => safeArray(state.categories?.categories)

export const getAllSubcategories = (state: RootState) => safeArray(state.categories?.subcategories)

export const categoriesReducer = categoriesSlice.reducer
