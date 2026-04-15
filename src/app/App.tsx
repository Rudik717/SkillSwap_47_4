import {
  About,
  Home,
  Login,
  NotFound,
  ProfilePage,
  Registration,
  ServerError,
  SkillDetails,
} from '@/pages'
import { ProtectedRoute } from '@/protected-route'
import { initSession } from '@/services/session.init'
import type { AppDispatch } from '@/store'
import { getCategories } from '@/store/categories'
import { getCities } from '@/store/cities'
import { getUsers } from '@/store/users'
import { Favorites, ProfileExchanges, ProfileInfo, ProfileRequests } from '@/widgets'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { AppLayout } from './AppLayout'

export const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    initSession()
    dispatch(getCategories())
    dispatch(getCities())
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/server-error" element={<ServerError />} />
        <Route path="/register" element={<Registration />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileInfo />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="requests" element={<ProfileRequests />} />
          <Route path="exchanges" element={<ProfileExchanges />} />
        </Route>

        <Route path="/skill/:id" element={<SkillDetails />} />
      </Route>
    </Routes>
  )
}
