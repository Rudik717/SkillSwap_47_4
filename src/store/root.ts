import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { categoriesReducer } from './categories'
import { citiesReducer } from './cities'

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cities: citiesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
