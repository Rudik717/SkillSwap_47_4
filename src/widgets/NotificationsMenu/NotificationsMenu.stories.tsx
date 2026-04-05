import { Icon } from '@/ui-kit'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { NotificationsMenu } from './NotificationsMenu'

const mockNotifications = [
  {
    id: '1',
    user: 'Николай',
    text: 'принял ваш обмен',
    date: 'сегодня',
    isRead: false,
    link: '/profile/1',
  },
  {
    id: '2',
    user: 'Татьяна',
    text: 'предлагает вам обмен',
    date: 'сегодня',
    isRead: false,
    link: '/profile/2',
  },
  {
    id: '3',
    user: 'Олег',
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

const meta: Meta<typeof NotificationsMenu> = {
  title: 'Widgets/NotificationsMenu',
  component: NotificationsMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Открыто ли меню',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Колбэк закрытия меню',
    },
    triggerRef: {
      description: 'Ref элемента, относительно которого позиционируется меню',
      table: {
        type: { summary: 'React.RefObject<HTMLElement | null>' },
      },
    },
    notifications: {
      description: 'Массив уведомлений для отображения',
      table: {
        type: {
          summary: 'Notification[]',
          detail: `{
  id: string
  user: string
  text: string
  date: string
  isRead: boolean
  link?: string
}`,
        },
      },
    },
  },
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

type Story = StoryObj<typeof NotificationsMenu>

export const Default: Story = {
  args: {
    isOpen: true,
    notifications: mockNotifications,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const unreadCount = args.notifications?.filter((n) => !n.isRead).length || 0

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'white',
            border: 'none',
            cursor: 'pointer',
            padding: '12px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
          }}
        >
          <Icon name="bell" size={24} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '12px',
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
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          triggerRef={buttonRef}
        />
      </div>
    )
  },
}
