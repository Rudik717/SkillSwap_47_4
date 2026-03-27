import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './Text'

const meta = {
  title: 'UI-Kit/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      desciption: 'Любой текстовый тег (h1-h4, p, span и др.)',
    },
    variant: {
      control: {
        type: 'select',
        options: ['H1', 'H2', 'H3', 'H4', 'Body', 'Caption'],
      },
      description: 'Название варианта тега',
      table: {
        defaultValue: { summary: 'Body' },
      },
    },
    color: {
      control: 'color',
      description: 'Цвет текста',
    },
    as: {
      control: 'text',
      description: 'Любой строковый тег, помимо h1-h4 и p',
    },
  },
} satisfies Meta<typeof Text>

export default meta

type Story = StoryObj<typeof Text>

// Заголовки
export const H1: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'H1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок уровня h1. Шрифт "Jost-Medium"',
      },
    },
  },
}

export const H2: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'H2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок уровня h2. Шрифт "Jost-Medium"',
      },
    },
  },
}

export const H3: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'H3',
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок уровня h3. Шрифт "Jost-Medium"',
      },
    },
  },
}

export const H4: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'H4',
  },
  parameters: {
    docs: {
      description: {
        story: 'Заголовок уровня h4. Шрифт "Roboto-Medium"',
      },
    },
  },
}

// Основной текст
export const Body: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'Body',
  },
  parameters: {
    docs: {
      description: {
        story: 'Основной текст страницы. Шрифт "Roboto-Regular"',
      },
    },
  },
}

// Мелкий текст
export const Caption: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'Caption',
  },
  parameters: {
    docs: {
      description: {
        story: 'Мелкий текст. Шрифт "Roboto-Regular"',
      },
    },
  },
}

// Пример комбинированного использования разных пропсов
export const MixedVariant: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    as: 'span',
    variant: 'Body',
    color: 'var(--bg)',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример, когда создается тег "span" со стилями из variant="Body" и новым цветом текста',
      },
    },
  },
}
