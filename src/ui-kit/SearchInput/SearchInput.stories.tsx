import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useEffect, useRef, useState } from 'react'

import SearchInput from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'UI-Kit/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return <SearchInput value={value} onChange={setValue} />
  },
}

export const Focus: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, [])

    return <SearchInput ref={inputRef} value={value} onChange={setValue} />
  },
}

export const Typing: Story = {
  render: () => {
    const [value, setValue] = useState('Rea')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(value.length, value.length)
      }
    }, [value])

    return <SearchInput ref={inputRef} value={value} onChange={setValue} />
  },
}

export const Filled: Story = {
  render: () => {
    const [value, setValue] = useState('React Developer')
    return <SearchInput value={value} onChange={setValue} />
  },
}
