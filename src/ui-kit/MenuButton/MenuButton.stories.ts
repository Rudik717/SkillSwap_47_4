import type { Meta, StoryObj } from '@storybook/react'

import { MenuButton } from './MenuButton'

const meta = {
  title: 'UI-Kit/MenuButton',
  component: MenuButton,
} satisfies Meta<typeof MenuButton>

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Все навыки',
    onPress: () => console.log('pressed'),
  },
}
