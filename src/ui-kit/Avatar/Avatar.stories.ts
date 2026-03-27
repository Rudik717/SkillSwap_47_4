import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from './Avatar'
import exampleUser from './userImageExample.jpg'

const meta = {
  title: 'UI-Kit/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Размер аватара',
      table: {
        defaultValue: { summary: 'md' },
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
    url: exampleUser,
    alt: 'User avatar',
    size: 'sm',
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
    url: exampleUser,
    alt: 'User avatar',
    size: 'md',
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
    url: exampleUser,
    alt: 'User avatar',
    size: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: '244px — используется в личном кабинете',
      },
    },
  },
}
