import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextInput } from './TextInput'

type Story = StoryObj<typeof TextInput>

const meta = {
  title: 'UI-Kit/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email'],
    },
    icon: {
      control: 'select',
      options: ['eye', 'edit', 'calendar'],
    },
    disabled: {
      control: 'boolean',
    },
    onChange: {
      action: 'changed',
    },
    onIconClick: {
      action: 'icon clicked',
    },
  },
} satisfies Meta<typeof TextInput>

export default meta

// Базовое использование
export const Default: Story = {
  args: {
    name: 'default-input',
    type: 'text',
    placeholder: 'Введите имя',
    label: 'Имя',
  },
}

// Отключённое поле
export const Disabled: Story = {
  args: {
    name: 'disabled-input',
    type: 'text',
    placeholder: 'Отключённое поле',
    label: 'Отключённое поле',
    disabled: true,
    value: 'Неизменяемый текст',
  },
}

// Длинный текст с ограничением длины
export const WithMaxLength: Story = {
  args: {
    name: 'max-length-input',
    type: 'text',
    placeholder: 'Максимум 10 символов',
    label: 'Ограниченная длина',
    maxLength: 10,
  },
}

// Заполненное поле
export const WithPassord: Story = {
  args: {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    value: 'Введите пароль',
    icon: 'eye',
  },
}

// Email‑поле
export const EmailField: Story = {
  args: {
    name: 'email-input',
    type: 'email',
    placeholder: 'user@example.com',
    label: 'Email',
  },
}

// Полный набор свойств
export const FullProps: Story = {
  args: {
    name: 'full-props-input',
    type: 'text',
    placeholder: 'Заполните все поля',
    label: 'Полное поле ввода',
    icon: 'edit',
    error: 'Проверьте правильность ввода',
    maxLength: 50,
    value: 'Предварительно заполненный текст',
  },
}
