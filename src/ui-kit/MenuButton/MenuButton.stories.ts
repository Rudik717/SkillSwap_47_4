import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { MenuButton } from './MenuButton'

const meta = {
  title: 'UI-Kit/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
} satisfies Meta<typeof MenuButton>

export default meta

export const Default: StoryObj = {
  args: {
    children: 'Все навыки', // текст кнопки
    onPress: action('on press!'), // обработчик нажатия
    color: '#000000', // цвет текста и иконки (чёрный)
  },
}

export const Filter: StoryObj = {
  args: {
    children: 'Все города', // текст кнопки
    onPress: action('on press!'), // обработчик нажатия
    color: 'rgba(80, 136, 38, 1)', // цвет текста и иконки (зелёный для фильтров)
  },
}
