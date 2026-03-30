import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { FilterChips } from './FilterChips'

const mockChips = [
  { id: '1', label: 'Хочу научиться', width: '201px' },
  { id: '2', label: 'Английский', width: '173px' },
]

const meta: Meta<typeof FilterChips> = {
  title: 'Widgets/FilterChips',
  component: FilterChips,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj = {
  args: {
    chips: mockChips,
    onRemove: action('remove chip'),
  },
}
