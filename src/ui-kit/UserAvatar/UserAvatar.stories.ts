import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserAvatar } from './UserAvatar'

const meta = {
  title: 'UI-Kit/UserAvatar',
  component: UserAvatar,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Имя пользователя',
    },
    url: {
      control: 'text',
      description: 'URL аватара пользователя',
    },
    size: {
      control: { type: 'number', min: 24, max: 100, step: 8 },
      description: 'Размер аватара в пикселях (по умолчанию 48px для хедера)',
      table: {
        defaultValue: { summary: '48' },
      },
    },
  },
} satisfies Meta<typeof UserAvatar>

export default meta

type Story = StoryObj<typeof UserAvatar>

export const Default: Story = {
  args: {
    name: 'Котик',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: 'Дефолтный размер для хедера — 48px',
      },
    },
  },
}

export const SmallSize: Story = {
  args: {
    name: 'Котик',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 32,
  },
  parameters: {
    docs: {
      description: {
        story: 'Уменьшенный размер (32px)',
      },
    },
  },
}

export const LargeSize: Story = {
  args: {
    name: 'Котик',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 64,
  },
  parameters: {
    docs: {
      description: {
        story: 'Увеличенный размер (64px)',
      },
    },
  },
}
