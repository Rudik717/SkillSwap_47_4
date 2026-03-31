import type { Meta, StoryObj } from '@storybook/react-vite'

import { DateInput } from './DateInput'

const meta: Meta<typeof DateInput> = {
  title: 'UI/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  args: {
    onChange: () => {},
    value: null,
    placeholder: 'дд.мм.гггг',
  },
}

export default meta
type Story = StoryObj<typeof DateInput>

export const Default: Story = {
  args: {
    id: 'date-default',
    label: 'Дата рождения',
  },
}

export const WithError: Story = {
  args: {
    id: 'date-error',
    label: 'Дата рождения',

    error: 'Выберите дату',
  },
}

export const WithValue: Story = {
  args: {
    id: 'date-with-value',
    label: 'Дата рождения',
    value: new Date(2000, 4, 3),
  },
}

export const WithMinMax: Story = {
  args: {
    id: 'date-minmax',
    label: 'Дата рождения',
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(2024, 0, 1),
  },
}
