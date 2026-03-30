import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon, type IconName, icons } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'UI-Kit/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(icons),
    },
    size: {
      control: 'number',
      description: 'Размер для квадратных иконок',
    },
    width: {
      control: 'number',
      description: 'Ширина (приоритет над size)',
    },
    height: {
      control: 'number',
      description: 'Высота (приоритет над size)',
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Primary: Story = {
  args: {
    name: 'clock',
    color: undefined,
    size: 24,
    width: undefined,
    height: undefined,
  },
}

export const AllIcons: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {Object.keys(icons).map((name) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name={name as IconName} />
            <span> - {name}</span>
          </div>
        ))}
      </div>
    )
  },
}
