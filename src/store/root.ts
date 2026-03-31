import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { categoriesReducer } from './categories'

export const rootReducer = combineReducers({
  categories: categoriesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
