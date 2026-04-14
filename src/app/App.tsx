/* global window */
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
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
import { Favorites, MySkills, ProfileInfo } from '@/widgets'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { AppLayout } from './AppLayout'

export const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isOnline = useOnlineStatus()

  useEffect(() => {
    initSession()
    dispatch(getCategories())
    dispatch(getCities())
    dispatch(getUsers())
  }, [dispatch])

  if (!isOnline) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>🌐 Нет интернета</h1>
        <p>Проверьте подключение и обновите страницу</p>
        <button onClick={() => window.location.reload()}>Обновить</button>
      </div>
    )
  }

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
          <Route path="myskills" element={<MySkills />} />
        </Route>

        <Route path="/skill/:id" element={<SkillDetails />} />
      </Route>
    </Routes>
  )
}
