import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'

import { ServerError } from './ServerError'

const meta: Meta<typeof ServerError> = {
  title: 'Pages/ServerError',
  component: ServerError,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/server-error']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta

export const ServerError500: StoryObj<typeof meta.component> = {}
