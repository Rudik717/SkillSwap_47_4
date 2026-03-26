import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'UI-Kit/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'arrow-down',
        'arrow-right',
        'bell',
        'calendar',
        'clock',
        'cross',
        'edit',
        'eye',
        'gallery-add',
        'idea',
        'like',
        'logout',
        'message',
        'moon',
        'more-square',
        'request',
        'search',
        'share',
        'sort',
        'user',
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof Icon>

export const Primary: Story = {
  args: {
    name: 'clock',
    color: undefined,
    size: undefined,
  },
}
