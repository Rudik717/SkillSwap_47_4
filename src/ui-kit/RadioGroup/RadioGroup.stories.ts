import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from './RadioGroup'

// Задача: создать Storybook для компонента RadioGroup.
// Требования:
// - autodocs для автоматической документации
// - пример использования с тремя опциями (пол автора)
// - возможность менять выбранное значение через панель Controls
// - обработчик onChange выводит выбранное значение в консоль

const meta = {
  title: 'UI-Kit/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'], // авто-документация в Storybook
} satisfies Meta<typeof RadioGroup>

export default meta

export const Default: StoryObj = {
  args: {
    options: [
      { label: 'Не имеет значения', value: 'any' },
      { label: 'Мужской', value: 'male' },
      { label: 'Женский', value: 'female' },
    ],
    value: 'any', // значение по умолчанию
    onChange: (value: string) => console.log('Selected:', value), // лог в консоль
  },
}
