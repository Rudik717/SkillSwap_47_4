import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './Avatar'

const meta = {
  title: 'UI-Kit/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 24, max: 300, step: 8 },
      description: 'Размер аватара в пикселях',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    url: {
      control: 'text',
      description: 'URL изображения',
    },
    alt: {
      control: 'text',
      description: 'Альтернативный текст',
    },
  },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof Avatar>

export const Small: Story = {
  args: {
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    alt: 'User avatar',
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: '48px — используется в хедере',
      },
    },
  },
}

export const Medium: Story = {
  args: {
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    alt: 'User avatar',
    size: 100,
  },
  parameters: {
    docs: {
      description: {
        story: '100px — используется в карточках навыков (размер по умолчанию)',
      },
    },
  },
}

export const Large: Story = {
  args: {
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    alt: 'User avatar',
    size: 244,
  },
  parameters: {
    docs: {
      description: {
        story: '244px — используется в личном кабинете',
      },
    },
  },
}
