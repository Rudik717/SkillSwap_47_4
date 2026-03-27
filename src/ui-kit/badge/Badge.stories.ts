import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './Badge'

const meta = {
  title: 'UI-Kit/Badge',
  component: Badge,
  argTypes: {
    label: { control: 'text' },
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Badge>

export default meta

export const ColorFirst: StoryObj<typeof meta.component> = {
  args: {
    label: 'Английский язык',
    backgroundColor: '#EBE5C5',
  },
}

export const ColorSecond: StoryObj<typeof meta.component> = {
  args: {
    label: 'Тайм менеджмент',
    backgroundColor: '#E7F2F6',
  },
}

export const ColorThird: StoryObj<typeof meta.component> = {
  args: {
    label: 'Медитация',
    backgroundColor: '#E9F7E7',
  },
}

export const ColorFourth: StoryObj<typeof meta.component> = {
  args: {
    label: 'Игра на барабанах',
    backgroundColor: '#F7E7F2',
  },
}
