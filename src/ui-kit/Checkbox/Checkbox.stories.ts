import type { Meta, StoryObj } from '@storybook/react-vite'
// было @storybook/react
import { action } from 'storybook/actions'

// добавил action для onPress
import { Checkbox } from './Checkbox'

const meta = {
  title: 'UI-Kit/Checkbox',
  component: Checkbox,
  tags: ['autodocs'], // добавил autodocs
} satisfies Meta<typeof Checkbox>

export default meta

export const Unchecked: StoryObj = {
  args: {
    state: 'unchecked',
    children: 'Бизнес и карьера',
    onPress: action('unchecked pressed'), // было console.log
  },
}

export const Checked: StoryObj = {
  args: {
    state: 'checked',
    children: 'Творчество и искусство',
    onPress: action('checked pressed'), // было console.log
  },
}

export const Indeterminate: StoryObj = {
  args: {
    state: 'indeterminate',
    children: 'Образование и развитие',
    onPress: action('indeterminate pressed'), // было console.log
  },
}
