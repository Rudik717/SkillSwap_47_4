import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'

import { NotFound404 } from './NotFound'

const meta: Meta<typeof NotFound404> = {
  title: 'Pages/NotFound404',
  component: NotFound404,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/not-found']}>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta

export const NotFound404Page: StoryObj<typeof meta.component> = {}
