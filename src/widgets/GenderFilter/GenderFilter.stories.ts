import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { GenderFilter } from './GenderFilter'

const meta = {
  title: 'Widgets/GenderFilter',
  component: GenderFilter,
  tags: ['autodocs'],
} satisfies Meta<typeof GenderFilter>

export default meta

export const Default: StoryObj = {
  args: {
    name: 'gender',
    options: [
      { label: 'Не имеет значения', value: 'any' },
      { label: 'Мужской', value: 'male' },
      { label: 'Женский', value: 'female' },
    ],
    onChange: action('onChange'),
  },
}
