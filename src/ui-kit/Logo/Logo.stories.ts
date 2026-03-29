import type { Meta, StoryObj } from '@storybook/react-vite'

import { Logo } from './Logo'

const meta = {
  title: 'UI-Kit/Logo',
  component: Logo,
} satisfies Meta<typeof Logo>

export default meta

export const Default: StoryObj = {}
