import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useCallback, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { MenuWrapper } from './MenuWrapper'

const meta: Meta<typeof MenuWrapper> = {
  title: 'Widgets/MenuWrapper',
  component: MenuWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
      description: 'Позиционирование меню относительно родителя',
    },
    isOpen: {
      control: 'boolean',
      description: 'Состояние открытия/закрытия меню',
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuWrapper>

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    const handleToggle = useCallback(() => {
      setIsOpen((prev) => !prev)
    }, [])

    const onClose = useCallback(() => {
      setIsOpen(false)
    }, [])

    return (
      <>
        <button
          ref={buttonRef}
          onClick={handleToggle}
          style={{ marginBottom: '20px', padding: '8px 16px' }}
        >
          {isOpen ? 'Закрыть меню' : 'Открыть меню'}
        </button>

        <div
          style={{
            position: 'relative',
            minHeight: '300px',
            minWidth: '700px',
          }}
        >
          <div
            style={{
              minHeight: '80px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid rgba(105, 115, 93, 1)',
            }}
          >
            <p>Здесь будет Header (родительский элемент с position: relative)</p>
          </div>
          <MenuWrapper isOpen={isOpen} onClose={onClose} triggerRef={buttonRef}>
            <div
              style={{
                padding: '40px',
                border: '1px solid rgb(178 185 169 / 100%)',
                borderRadius: '12px',
              }}
            >
              <p>Личный кабинет</p>
              <p>Выйти из аккаунта</p>
            </div>
          </MenuWrapper>
        </div>
      </>
    )
  },
}
