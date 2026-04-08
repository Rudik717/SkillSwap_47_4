import { Home, Login, NotFound, ProfilePage, Registration, ServerError } from '@/pages'
import type { AppDispatch } from '@/store'
import { getCategories } from '@/store/categories'
import { getCities } from '@/store/cities'
import { getUsers } from '@/store/users'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { AppLayout } from './AppLayout'

export const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getCities())
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="server-error" element={<ServerError />} />
        <Route path="/profile/user-data" element={<ProfilePage />} />
        <Route path="/register" element={<Registration />} />
      </Route>
    </Routes>
  )
}
