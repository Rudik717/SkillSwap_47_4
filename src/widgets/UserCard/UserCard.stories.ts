import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserCard } from './UserCard'

const meta: Meta<typeof UserCard> = {
  title: 'Widgets/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof UserCard>

export const Default: Story = {
  args: {
    user: {
      id: '1',
      name: 'Иван',
      email: 'ivan@example.com',
      city: 'Санкт-Петербург',
      birthDate: '15.05.1990',
      url: '',
      about: 'Люблю ритм, кофе по утрам',
      skills: [],
      createdAt: '2025-01-15T10:30:00Z',
      updatedAt: '2025-03-30T15:20:00Z',
    },
  },
}
