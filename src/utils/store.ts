import { categoriesReducer } from '@/store/categories'
import { citiesReducer } from '@/store/cities'
import { filterReducer } from '@/store/filter'
import type { TGender, TRole } from '@/utils'
import { configureStore } from '@reduxjs/toolkit'

import type { SortDirection } from '@utils/types'

import { categories as categoriesData } from '../data/categories'
import { cities as citiesData } from '../data/cities'

const { categories, subcategories } = categoriesData ?? {}
const { cities } = citiesData ?? {}

export const mockStore = configureStore({
  reducer: {
    categories: categoriesReducer,
    cities: citiesReducer,
    filter: filterReducer,
  },
  preloadedState: {
    categories: {
      categories,
      subcategories,
      loading: false,
      error: null,
    },
    cities: {
      loading: false,
      error: null,
      cities,
    },
    filter: {
      role: 'learn' as TRole,
      subcategories: [],
      gender: 'female' as TGender,
      cities: [],
      search: '',
      sort: { by: '', direction: 'desc' as SortDirection },
    },
  },
})
