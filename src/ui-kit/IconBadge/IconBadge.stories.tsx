import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../Icon/Icon'
import { IconBadge } from './IconBadge'

const meta = {
  title: 'UI-Kit/IconBadge',
  component: IconBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компонент для отображения индикатора уведомлений поверх иконки. Бейдж автоматически масштабируется относительно размера иконки.',
      },
    },
  },
  argTypes: {
    isVisible: {
      control: 'boolean',
      description: 'Показывать ли бейдж',
      defaultValue: false,
    },
    iconSize: {
      control: 'number',
      description: 'Размер иконки в пикселях (нужен для правильного масштабирования бейджа)',
      defaultValue: 24,
    },
    children: {
      control: false,
      description: 'Дочерний элемент (обычно иконка из компонента Icon)',
    },
  },
} satisfies Meta<typeof IconBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Visible: Story = {
  args: {
    isVisible: true,
    children: <Icon name="bell" size={24} />,
  },
}

export const Hidden: Story = {
  args: {
    isVisible: false,
    children: <Icon name="bell" size={24} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Когда isVisible = false, бейдж не отображается.',
      },
    },
  },
}

export const WithDifferentIcons: Story = {
  args: {
    children: <Icon name="bell" size={24} />,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <IconBadge isVisible={true}>
        <Icon name="message" size={24} />
      </IconBadge>
      <IconBadge isVisible={true}>
        <Icon name="user" size={24} />
      </IconBadge>
      <IconBadge isVisible={true}>
        <Icon name="calendar" size={24} />
      </IconBadge>
      <IconBadge isVisible={true}>
        <Icon name="request" size={24} />
      </IconBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Примеры использования с разными иконками из UI-Kit.',
      },
    },
  },
}

export const WithDifferentIconSizes: Story = {
  args: {
    children: <Icon name="bell" size={24} />,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <IconBadge isVisible iconSize={16}>
        <Icon name="bell" size={16} />
      </IconBadge>
      <IconBadge isVisible>
        <Icon name="bell" size={24} />
      </IconBadge>
      <IconBadge isVisible iconSize={32}>
        <Icon name="bell" size={32} />
      </IconBadge>
      <IconBadge isVisible iconSize={40}>
        <Icon name="bell" size={40} />
      </IconBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Бейдж адаптируется под размер иконки, переданный в компонент Icon через пропс size.',
      },
    },
  },
}
