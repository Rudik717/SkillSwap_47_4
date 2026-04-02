import { defineMock } from 'vite-plugin-mock-dev-server'

import { data } from './cities'

export default defineMock({
  url: '/api/cities',
  body: {
    success: true,
    data,
  },
})
