import type { Meta, StoryObj } from '@storybook/react-vite'

import { TextInput } from './TextInput'

type Story = StoryObj<typeof TextInput>

const meta: Meta<typeof TextInput> = {
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
      options: [undefined, 'eye', 'edit', 'calendar'],
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
}

export default meta

// Базовое использование
export const Default: Story = {
  args: {
    name: 'default-input',
    type: 'text',
    placeholder: 'Введите текст',
    label: 'Текстовое поле',
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

// Поле с иконкой «глаз» (для пароля)
export const WithEyeIcon: Story = {
  args: {
    name: 'password-input',
    type: 'password',
    placeholder: 'Введите пароль',
    label: 'Пароль',
    icon: 'eye',
  },
}

// Поле с иконкой «редактировать»
export const WithEditIcon: Story = {
  args: {
    name: 'edit-input',
    type: 'text',
    placeholder: 'Редактируемое поле',
    label: 'Редактируемое поле',
    icon: 'edit',
  },
}

// Пароль с возможностью показать/скрыть
export const PasswordWithToggle: Story = {
  args: {
    name: 'password-toggle',
    type: 'password',
    placeholder: '••••••••',
    label: 'Пароль',
    icon: 'eye',
    value: 'mysecretpassword',
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

// Без лейбла
export const WithoutLabel: Story = {
  args: {
    name: 'no-label-input',
    type: 'text',
    placeholder: 'Без лейбла',
  },
}

// Заполненное поле
export const Filled: Story = {
  args: {
    name: 'filled-input',
    type: 'text',
    label: 'Заполненное поле',
    value: 'Уже введённый текст',
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
