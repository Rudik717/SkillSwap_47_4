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
        'briefcase',
        'earth',
        'home',
        'palette',
        'book',
        'list',
        'add',
        'arrow-left',
        'arrow-square-left',
        'arrow-square-right',
        'checkbox-done',
        'checkbox-empty',
        'checkbox-remove',
        'chevron-up',
        'count',
        'done',
        'eye-slash',
        'filter-square',
        'gallery-edit',
        'like-filled',
        'plus-circle',
        'radiobutton-active',
        'radiobutton-empty',
        'scroll-big',
        'scroll',
        'sun',
        'user-circle',
      ],
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
