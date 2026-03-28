import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { FormInput } from './FormInput'

const meta: Meta<typeof FormInput> = {
  title: 'UI/FormInput',
  component: FormInput,
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
