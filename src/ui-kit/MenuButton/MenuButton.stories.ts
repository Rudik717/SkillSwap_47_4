import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { MenuButton } from './MenuButton'

const meta = {
  title: 'UI-Kit/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      control: 'select',
      options: ['arrow-down', 'arrow-up', 'arrow-left', 'arrow-right', 'cross', 'search'],
      description: 'Название иконки',
    },
    iconColor: {
      control: 'select',
      options: ['original', 'black', 'text'],
      description: 'Цвет иконки',
    },
  },
} satisfies Meta<typeof MenuButton>

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Все навыки',
    onPress: action('on press!'),
    color: '#000000',
    iconName: 'arrow-down',
    iconColor: 'black',
  },
}

export const Filter: StoryObj = {
  args: {
    children: 'Все города',
    onPress: action('on press!'),
    color: 'rgba(80, 136, 38, 1)',
    iconName: 'arrow-down',
    iconColor: 'text',
  },
}
