import { Catalog, Home, NotFound, ServerError } from '@/pages'
import type { AppDispatch } from '@/store'
import { getCategories, getCategoriesState } from '@/store/categories'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { AppLayout } from './AppLayout'

export const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, categories, subcategories } = useSelector(getCategoriesState)
  console.log(' *** categories', loading, categories, subcategories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="server-error" element={<ServerError />} />
      </Route>
    </Routes>
  )
}
