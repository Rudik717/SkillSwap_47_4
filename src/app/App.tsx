import { Catalog, NotFound, ServerError } from '@/pages'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import { AppLayout } from './AppLayout'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Catalog />} />
        <Route path="server-error" element={<ServerError />} />
      </Route>
    </Routes>
  )
}
