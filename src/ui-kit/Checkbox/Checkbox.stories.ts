import type { Meta, StoryObj } from '@storybook/react-vite'
// ИСПРАВЛЕНО: был импорт из '@storybook/react' — линтер ругался
// ЗАМЕНЕНО на '@storybook/react-vite' — ошибка ушла

import { action } from 'storybook/actions'

// ДОБАВЛЕНО: action для onPress — теперь в панели Actions видно событие

import { Checkbox } from './Checkbox'

const meta = {
  title: 'UI-Kit/Checkbox',
  component: Checkbox,
  tags: ['autodocs'], // ДОБАВЛЕНО: авто-документация в Storybook
} satisfies Meta<typeof Checkbox>

export default meta

// ДОБАВЛЕНО: action вместо console.log во всех трёх состояниях
export const Unchecked: StoryObj = {
  args: {
    state: 'unchecked',
    children: 'Бизнес и карьера',
    onPress: action('unchecked pressed'), // было console.log(...)
  },
}

export const Checked: StoryObj = {
  args: {
    state: 'checked',
    children: 'Творчество и искусство',
    onPress: action('checked pressed'), // было console.log(...)
  },
}

export const Indeterminate: StoryObj = {
  args: {
    state: 'indeterminate',
    children: 'Образование и развитие',
    onPress: action('indeterminate pressed'), // было console.log(...)
  },
}
