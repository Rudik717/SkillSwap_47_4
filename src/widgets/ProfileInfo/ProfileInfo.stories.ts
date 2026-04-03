import type { TCity } from '@/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProfileInfo } from './ProfileInfo'

const fakeCities: TCity[] = [
  { id: '1', name: 'Москва' },
  { id: '2', name: 'Санкт-Петербург' },
  { id: '3', name: 'Новосибирск' },
]

const meta: Meta<typeof ProfileInfo> = {
  title: 'Widgets/ProfileInfo',
  component: ProfileInfo,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ProfileInfo>

export const Default: Story = {
  args: {
    cities: fakeCities,
    user: {
      id: '1',
      name: 'Мария',
      email: 'Mariia@gmail.com',
      birthDate: '1995-10-28',
      gender: 'female',
      city: 'Москва',
      about:
        'Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем‑то интересным!',
      avatar:
        'https://images.unsplash.com/photo-1520512202623-51c5c53957df?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      skills: [],
      createdAt: '2023-01-01',
      updatedAt: '2026-01-01',
    },
  },
}
