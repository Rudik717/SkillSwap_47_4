import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './Header'

const meta = {
  title: 'Widgets/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['unauth', 'auth', 'registration'],
      },
      description: 'Состояние хедера',
      table: {
        defaultValue: { summary: 'unauth' },
      },
    },
    userName: {
      control: 'text',
      description: 'Имя пользователя (для авторизованного состояния)',
    },
  },
} satisfies Meta<typeof Header>

export default meta

type Story = StoryObj<typeof Header>

export const Unauthorized: Story = {
  args: {
    variant: 'unauth',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Хедер для неавторизованного пользователя. Показывает кнопки "Войти" и "Зарегистрироваться"',
      },
    },
  },
}

export const Authorized: Story = {
  args: {
    variant: 'auth',
    userName: 'Мария',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Хедер для авторизованного пользователя. Показывает имя пользователя и кнопку выхода',
      },
    },
  },
}

export const Registration: Story = {
  args: {
    variant: 'registration',
  },
  parameters: {
    docs: {
      description: {
        story: 'Хедер для страницы регистрации. Скрывает навигационное меню и поиск',
      },
    },
  },
}

export const WithLongUserName: Story = {
  args: {
    variant: 'auth',
    userName: 'Мария Ивановна Петрова',
  },
  parameters: {
    docs: {
      description: {
        story: 'Длинное имя пользователя корректно отображается',
      },
    },
  },
}

export const WithoutUserName: Story = {
  args: {
    variant: 'auth',
    userName: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Если имя пользователя не передано — показывается заглушка',
      },
    },
  },
}
