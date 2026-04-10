import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'UI-Kit/SearchInput',
  component: SearchInput,
  parameters: {},
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return <SearchInput value={value} onChange={setValue} placeholder="Искать навык" />
  },
}

export const Focus: Story = {
  render: () => {
    const [value, setValue] = useState('')

    useEffect(() => {
      const timer = setTimeout(() => {
        const input = document.querySelector('input')
        if (input) {
          input.focus()
        }
      }, 100)
      return () => clearTimeout(timer)
    }, [])

    return <SearchInput value={value} onChange={setValue} placeholder="Искать навык" />
  },
}

export const Typing: Story = {
  render: () => {
    const [value, setValue] = useState('навык')

    useEffect(() => {
      const timer = setTimeout(() => {
        const input = document.querySelector('input')
        if (input) {
          input.focus()
        }
      }, 100)
      return () => clearTimeout(timer)
    }, [])

    return <SearchInput value={value} onChange={setValue} placeholder="Искать навык" />
  },
}

export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState('React разработчик')
    return <SearchInput value={value} onChange={setValue} placeholder="Искать навык" />
  },
}
