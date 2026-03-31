import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { action } from 'storybook/actions'

import { Checkbox, type CheckboxState } from './Checkbox'

const meta = {
  title: 'UI-Kit/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

export const Unchecked: StoryObj = {
  args: {
    state: 'unchecked',
    children: 'Бизнес и карьера',
    onPress: action('unchecked pressed'),
  },
}

export const Checked: StoryObj = {
  args: {
    state: 'checked',
    children: 'Творчество и искусство',
    onPress: action('checked pressed'),
  },
}

export const Indeterminate: StoryObj = {
  args: {
    state: 'indeterminate',
    children: 'Образование и развитие',
    onPress: action('indeterminate pressed'),
  },
}

export const ClickTest: StoryObj = {
  args: {},
  render: () => {
    const [state, setState] = useState<CheckboxState>('unchecked')

    const onClick = () => {
      if (state === 'unchecked') {
        setState('checked')
      } else if (state === 'checked') {
        setState('indeterminate')
      } else {
        setState('unchecked')
      }
    }

    return (
      <Checkbox onClick={onClick} state={state}>
        Здоровье и лайфстайл
      </Checkbox>
    )
  },
}
