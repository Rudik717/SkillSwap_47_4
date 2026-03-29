import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta = {
  title: 'UI-Kit/Button',
  component: Button,
  tags: ['autodocs'], // добавлено для авто-документации в Storybook
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export default meta

export const Primary: StoryObj = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: StoryObj = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Tertiary: StoryObj = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
}

export const WithIconRight: StoryObj = {
  args: {
    variant: 'secondary',
    children: 'Редактировать',
    iconRight: 'bell',
  },
}

export const WithIconLeft: StoryObj = {
  args: {
    variant: 'tertiary',
    children: 'Сначала новые',
    iconLeft: 'bell',
  },
}

export const Disabled: StoryObj = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
}

export const CustomWidthButton: Story = {
  args: {
    children: 'Button with a custom width',
  },
  render: () => {
    return (
      <div style={{ display: 'flex', width: 280 }}>
        <Button iconLeft="bell">Задана ширина</Button>
      </div>
    )
  },
}

export const TwoButtons: Story = {
  args: {
    children: 'Two buttons in one row',
  },
  render: () => {
    return (
      <div style={{ display: 'flex', flex: 1, gap: 20 }}>
        <Button iconLeft="bell">Кнопка № 1</Button>
        <Button iconRight="bell" variant="secondary">
          Кнопка № 2
        </Button>
      </div>
    )
  },
}
