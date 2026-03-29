import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { FormField } from './FormField'

const meta: Meta<typeof FormField> = {
  title: 'UI-Kit/FormInput',
  component: FormField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: {
    label: 'Email',
    info: '',
    children: React.createElement('input', {
      type: 'text',
      placeholder: 'Введите email',
    }),
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Email уже используется',
    children: React.createElement('input', {
      type: 'text',
    }),
  },
}

export const TwoFields: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 20 }}>
        <FormField label="Эл. почта" error="Это поле не может быть пустым">
          <input style={{ display: 'flex', flex: 1 }} />
        </FormField>
        <FormField label="Пароль" info="Пароль должен содержать не менее 8 символов">
          <input style={{ display: 'flex', flex: 1 }} />
        </FormField>
      </div>
    )
  },
}
