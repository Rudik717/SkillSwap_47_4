import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { categoriesReducer } from './categories'
import { citiesReducer } from './cities'
import { filterReducer } from './filter'
import { notificationsReducer } from './notifications'
import { userSliceReducer } from './user-slice'
import { usersReducer } from './users'

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cities: citiesReducer,
  filter: filterReducer,
  users: usersReducer,
  user: userSliceReducer,
  notifications: notificationsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof rootReducer>
