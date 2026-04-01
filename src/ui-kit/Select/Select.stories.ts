import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'UI-Kit/Select',
  component: Select,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Select>

const options = [
  { label: 'Москва', value: 'msk' },
  { label: 'Санкт-Петербург', value: 'spb' },
  { label: 'Самара', value: 'samara' },
]

export const Default: Story = {
  args: {
    label: 'Город',
    options,
    placeholder: 'Не указан',
  },
}

export const WithError: Story = {
  args: {
    label: 'Город',
    options,
    error: 'Выберите значение',
    value: null,
  },
}

export const Selected: Story = {
  args: {
    label: 'Город',
    options,
    value: { label: 'Москва', value: 'msk' },
  },
}

export const Searchable: Story = {
  args: {
    label: 'Город',
    options,
    isSearchable: true,
    placeholder: 'Не указан',
  },
}

export const WithCheckboxes: Story = {
  args: {
    label: 'Город',
    options: [
      { label: 'Москва', value: 'msk' },
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Самара', value: 'samara' },
    ],
    placeholder: 'Не указан',
    isSearchable: true,
    isMulti: true,
  },
}
