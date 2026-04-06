import { UserAvatar } from '@/ui-kit'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { UserMenu } from './UserMenu'

const meta: Meta<typeof UserMenu> = {
  title: 'Widgets/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UserMenu>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const avatarRef = useRef<HTMLDivElement>(null)

    return (
      <div style={{ position: 'relative', minHeight: '300px' }}>
        <div
          ref={avatarRef}
          style={{ display: 'inline-block', cursor: 'pointer' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <UserAvatar name="Иван Иванов" url="" />
        </div>
        <UserMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onLogout={() => console.log('Выход из аккаунта')}
          triggerRef={avatarRef}
        />
      </div>
    )
  },
}

export const Opened: Story = {
  render: () => {
    const mockRef = useRef<HTMLDivElement>(null)

    return (
      <div style={{ position: 'relative', minHeight: '300px' }}>
        <div ref={mockRef} style={{ display: 'inline-block' }}>
          <UserAvatar name="Иван Иванов" url="" />
        </div>
        <UserMenu
          isOpen={true}
          onClose={() => console.log('Закрыть')}
          onLogout={() => console.log('Выход из аккаунта')}
          triggerRef={mockRef}
        />
      </div>
    )
  },
}
