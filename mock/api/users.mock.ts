import { defineMock } from 'vite-plugin-mock-dev-server'

import { data } from './users'

export default defineMock({
  url: '/api/users',
  body: {
    success: true,
    data,
  },
})
