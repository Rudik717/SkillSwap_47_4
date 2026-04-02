import { defineMock } from 'vite-plugin-mock-dev-server'

import { data } from './categories'

export default defineMock({
  url: '/api/categories',
  body: {
    success: true,
    data,
  },
})
