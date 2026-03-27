import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './Checkbox'

const meta = {
  title: 'UI-Kit/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta

export const Unchecked: StoryObj = {
  args: {
    state: 'unchecked',
    children: 'Бизнес и карьера',
    onPress: () => console.log('unchecked pressed'),
  },
}

export const Checked: StoryObj = {
  args: {
    state: 'checked',
    children: 'Творчество и искусство',
    onPress: () => console.log('checked pressed'),
  },
}

export const Indeterminate: StoryObj = {
  args: {
    state: 'indeterminate',
    children: 'Образование и развитие',
    onPress: () => console.log('indeterminate pressed'),
  },
}
