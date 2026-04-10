import { Icon } from '@/ui-kit'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { NotificationsMenu } from './NotificationsMenu'

const meta: Meta<typeof NotificationsMenu> = {
  title: 'Widgets/NotificationsMenu',
  component: NotificationsMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
}
export default meta
export const Default: StoryObj = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const notifications = [
      {
        id: '1',
        user: 'Олег',
        text: 'предлагает вам обмен',
        date: 'сегодня',
        isRead: false,
        link: '/profile/1',
      },
      {
        id: '2',
        user: 'Николай',
        text: 'принял ваш обмен',
        date: 'сегодня',
        isRead: false,
        link: '/profile/2',
      },
      {
        id: '3',
        user: 'Татьяна',
        text: 'предлагает вам обмен',
        date: 'вчера',
        isRead: true,
        link: '/profile/3',
      },
      {
        id: '4',
        user: 'Игорь',
        text: 'принял ваш обмен',
        date: '23 мая',
        isRead: true,
        link: '/profile/4',
      },
    ]
    const unreadCount = notifications.filter((n) => !n.isRead).length
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            padding: 12,
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
          }}
        >
          <Icon name="bell" size={24} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                width: 18,
                height: 18,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
        <NotificationsMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          triggerRef={buttonRef}
        />
      </div>
    )
  },
}
