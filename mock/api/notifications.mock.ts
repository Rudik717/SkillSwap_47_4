import { defineMock } from 'vite-plugin-mock-dev-server'

import { data } from './users'

export default defineMock([
  {
    url: '/api/users/:userId/notifications',
    method: 'GET',
    response: (req, res) => {
      const userId = req.params.userId
      const user = data.users.find((u) => u.id === userId)
      const notifications = user?.notifications || []

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: true,
          data: {
            notifications,
          },
        })
      )
    },
  },
  {
    url: '/api/notifications/mark-read',
    method: 'POST',
    response: (req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: true,
        })
      )
    },
  },
  {
    url: '/api/notifications/clear-read',
    method: 'DELETE',
    response: (req, res) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: true,
        })
      )
    },
  },
])
