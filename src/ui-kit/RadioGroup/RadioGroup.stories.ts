import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from './RadioGroup'

type Story = StoryObj<typeof RadioGroup>

const meta: Meta<typeof RadioGroup> = {
  title: 'UI-Kit/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Имя группы радиокнопок',
    },
    options: {
      description: 'Массив опций с label и value',
    },
    onChange: {
      action: 'onChange',
      description: 'Обработчик изменения выбора',
    },
  },
}

export default meta

export const DefaultVariant: Story = {
  args: {
    name: 'size',
    options: [
      { label: 'Всё', value: 'default' },
      { label: 'Хочу научиться', value: 'want-to-learn' },
      { label: 'Могу научить', value: 'can-teach' },
    ],
    onChange: (value) => console.log('Размер:', value),
  },
}
