import type { Meta, StoryObj } from '@storybook/react-vite'

import { UserAvatar } from './UserAvatar'

const meta = {
  title: 'UI-Kit/UserAvatar',
  component: UserAvatar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '110px', padding: '8px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: {
      control: 'text',
      description: 'Имя пользователя',
    },
    url: {
      control: 'text',
      description: 'URL аватара пользователя',
    },
    size: {
      control: { type: 'number', min: 24, max: 100, step: 8 },
      description: 'Размер аватара в пикселях (по умолчанию 48px для хедера)',
      table: {
        defaultValue: { summary: '48' },
      },
    },
  },
} satisfies Meta<typeof UserAvatar>

export default meta

type Story = StoryObj<typeof UserAvatar>

// С картинкой
export const Default: Story = {
  args: {
    name: 'Котик',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: 'Дефолтный размер для хедера — 48px',
      },
    },
  },
}

export const WithLongName: Story = {
  args: {
    name: 'Я точно кот',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: 'Длинные имена корректно обрезаются с многоточием',
      },
    },
  },
}

export const SmallSize: Story = {
  args: {
    name: 'Котик',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 32,
  },
  parameters: {
    docs: {
      description: {
        story: 'Уменьшенный размер (32px)',
      },
    },
  },
}

export const LargeSize: Story = {
  args: {
    name: 'Котик',
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 64,
  },
  parameters: {
    docs: {
      description: {
        story: 'Увеличенный размер (64px)',
      },
    },
  },
}

// Без картинки (серый кружок)
export const WithoutImage: Story = {
  args: {
    name: 'Мария',
    url: undefined,
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: 'Когда нет аватара — показывается серый кружок (48px)',
      },
    },
  },
}

export const WithoutImageSmall: Story = {
  args: {
    name: 'Мария',
    url: undefined,
    size: 32,
  },
  parameters: {
    docs: {
      description: {
        story: 'Маленький серый кружок (32px)',
      },
    },
  },
}

export const WithoutImageLarge: Story = {
  args: {
    name: 'Мария',
    url: undefined,
    size: 64,
  },
  parameters: {
    docs: {
      description: {
        story: 'Большой серый кружок (64px)',
      },
    },
  },
}

export const WithoutName: Story = {
  args: {
    name: undefined,
    url: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: 'Если нет имени — показывается "Пользователь"',
      },
    },
  },
}

export const WithoutNameAndImage: Story = {
  args: {
    name: undefined,
    url: undefined,
    size: 48,
  },
  parameters: {
    docs: {
      description: {
        story: 'Нет имени и нет аватарки — серый кружок и "Пользователь"',
      },
    },
  },
}
