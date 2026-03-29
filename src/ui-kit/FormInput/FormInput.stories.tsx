import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { FormInput } from './FormInput'

const meta: Meta<typeof FormInput> = {
  title: 'UI-Kit/FormInput',
  component: FormInput,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof FormInput>

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
        <FormInput label="Эл. почта" error="Это поле не может быть пустым">
          <input style={{ display: 'flex', flex: 1 }} />
        </FormInput>
        <FormInput label="Пароль" info="Пароль должен содержать не менее 8 символов">
          <input style={{ display: 'flex', flex: 1 }} />
        </FormInput>
      </div>
    )
  },
}
