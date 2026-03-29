import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  title: 'UI-Kit/Button',
  component: Button,
  tags: ['autodocs'], // добавлено для авто-документации в Storybook
} satisfies Meta<typeof Button>

export default meta

export const Primary: StoryObj = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Tertiary: StoryObj = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
}

export const WithIconRight: StoryObj = {
  args: {
    variant: 'secondary',
    children: 'Редактировать',
    iconRight: '/src/assets/svg/edit.svg',
  },
}

export const WithIconLeft: StoryObj = {
  args: {
    variant: 'tertiary',
    children: 'Сначала новые',
    iconLeft: '/src/assets/svg/sort.svg',
  },
}

export const Disabled: StoryObj = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
}
