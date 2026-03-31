import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'

import { NotFound } from './NotFound'

const meta: Meta<typeof NotFound> = {
  title: 'Pages/NotFound',
  component: NotFound,
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
