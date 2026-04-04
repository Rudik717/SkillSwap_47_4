import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { FilterChipsUI } from './FilterChipsUI'

const mockChips = [
  { id: '1', label: 'Хочу научиться' },
  { id: '2', label: 'Английский' },
  { id: '3', label: 'Иностранные языки' },
  { id: '4', label: 'Дом и уют' },
]

const meta: Meta<typeof FilterChipsUI> = {
  title: 'Widgets/FilterChips',
  component: FilterChipsUI,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj = {
  args: {
    chips: mockChips,
    onClick: action('remove chip'),
  },
}
