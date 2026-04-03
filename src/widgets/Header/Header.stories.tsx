import { mockStore } from '@/utils/store'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: { type: 'select', options: ['unauth', 'auth', 'registration'] } },
    userName: { control: 'text' },
    avatarUrl: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof Header>

export const Unauthorized: Story = { args: { variant: 'unauth' } }

export const Authorized: Story = {
  args: { variant: 'auth', userName: 'Мария', avatarUrl: 'https://i.pravatar.cc/40' },
}

export const Registration: Story = { args: { variant: 'registration' } }

export const WithLongUserName: Story = {
  args: {
    variant: 'auth',
    userName: 'Мария Ивановна Петрова',
    avatarUrl: 'https://i.pravatar.cc/40',
  },
}

export const WithoutUserName: Story = {
  args: { variant: 'auth', userName: undefined, avatarUrl: undefined },
}
