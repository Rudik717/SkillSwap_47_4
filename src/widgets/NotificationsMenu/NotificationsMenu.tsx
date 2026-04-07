/* eslint-disable no-undef */
import { Button, Icon, Text } from '@/ui-kit'
import { MenuWrapper } from '@/widgets'
import { Toast } from '@/widgets/Toast/Toast'
import React, { useEffect, useState } from 'react'

import styles from './NotificationsMenu.module.css'

export interface Notification {
  id: string
  user: string
  text: string
  date: string
  isRead: boolean
  link?: string
}
interface NotificationsMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  notifications?: Notification[]
  onNotificationsUpdate?: (notifications: Notification[]) => void
}
const getMockNotifications = (): Notification[] => [
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
  {
    id: '5',
    user: 'Анна',
    text: 'предлагает вам обмен',
    date: '22 мая',
    isRead: false,
    link: '/profile/5',
  },
  {
    id: '6',
    user: 'Михаил',
    text: 'принял ваш обмен',
    date: '21 мая',
    isRead: false,
    link: '/profile/6',
  },
]
const loadNotificationsFromStorage = (): Notification[] => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return getMockNotifications()
  }
  const stored = localStorage.getItem('skillswap_notifications')
  const parsed = stored ? JSON.parse(stored) : null
  if (parsed?.length) return parsed
  const mockData = getMockNotifications()
  localStorage.setItem('skillswap_notifications', JSON.stringify(mockData))
  return mockData
}
const saveNotificationsToStorage = (notifications: Notification[]) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('skillswap_notifications', JSON.stringify(notifications))
  }
}
const BellBadge = ({ unreadCount }: { unreadCount: number }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return
    const bellButton = document.querySelector('button [name="bell"]')?.closest('button')
    if (!bellButton) return
    bellButton.style.position = 'relative'
    bellButton.querySelector('.custom-bell-badge')?.remove()
    if (unreadCount > 0) {
      const badge = Object.assign(document.createElement('span'), {
        className: 'custom-bell-badge',
        textContent: unreadCount > 99 ? '99+' : unreadCount.toString(),
      })
      badge.style.cssText =
        'position:absolute;top:-8px;right:-8px;background:#dc3545;color:white;border-radius:50%;min-width:18px;height:18px;font-size:12px;display:flex;align-items:center;justify-content:center;padding:0 4px;font-weight:bold;pointer-events:none;z-index:1000'
      bellButton.appendChild(badge)
    }
  }, [unreadCount])
  return null
}
export const NotificationsMenu = ({
  isOpen,
  onClose,
  triggerRef,
  notifications: externalNotifications,
  onNotificationsUpdate,
}: NotificationsMenuProps) => {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(
    () => externalNotifications || loadNotificationsFromStorage()
  )
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  useEffect(() => {
    if (!externalNotifications) saveNotificationsToStorage(localNotifications)
    onNotificationsUpdate?.(localNotifications)
  }, [localNotifications, externalNotifications, onNotificationsUpdate])
  useEffect(() => {
    const unread = localNotifications.filter((n) => !n.isRead)
    if (unread.length && !showToast) {
      const offer = unread.find((n) => n.text === 'предлагает вам обмен')
      setToastMessage(
        offer
          ? `${offer.user} предлагает вам обмен`
          : unread.length === 1
            ? `${unread[0].user} ${unread[0].text}`
            : `У вас ${unread.length} новых уведомления`
      )
      setShowToast(true)
    }
  }, [localNotifications, showToast])
  const handleMarkAllAsRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    setShowToast(false)
  }
  const handleClearRead = () => {
    setLocalNotifications((prev) => prev.filter((n) => !n.isRead))
    if (!localNotifications.some((n) => !n.isRead)) setShowToast(false)
  }
  const getDescription = (n: Notification) =>
    n.text.includes('принял')
      ? 'Перейдите в профиль, чтобы обсудить детали'
      : 'Примите обмен, чтобы обсудить детали'
  const unreadNotifications = localNotifications.filter((n) => !n.isRead)
  const readNotifications = localNotifications.filter((n) => n.isRead)
  return (
    <>
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      {typeof document !== 'undefined' && <BellBadge unreadCount={unreadNotifications.length} />}
      <MenuWrapper
        isOpen={isOpen}
        onClose={onClose}
        triggerRef={triggerRef}
        position="bottom-right"
      >
        <div className={styles.menuWrapper}>
          <div className={styles.container}>
            {unreadNotifications.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <Text variant="H3">Новые уведомления</Text>
                  <button onClick={handleMarkAllAsRead} className={styles.actionLink}>
                    Прочитать все
                  </button>
                </div>
                {unreadNotifications.map((n) => (
                  <div key={n.id} className={styles.notificationItem}>
                    <div className={styles.notificationHeader}>
                      <Icon name="idea" size={20} />
                      <div className={styles.textContainer}>
                        <div className={styles.titleRow}>
                          <Text variant="H4">
                            {n.user} {n.text}
                          </Text>
                          <Text variant="Caption" className={styles.date}>
                            {n.date}
                          </Text>
                        </div>
                        <Text variant="Body">{getDescription(n)}</Text>
                      </div>
                    </div>
                    {n.link && (
                      <Button variant="primary" className={styles.goButton} onClick={() => {}}>
                        Перейти
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
            {readNotifications.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionHeader}>
                  <Text variant="H3">Просмотренные</Text>
                  <button onClick={handleClearRead} className={styles.actionLink}>
                    Очистить
                  </button>
                </div>
                {readNotifications.map((n) => (
                  <div key={n.id} className={styles.notificationItem}>
                    <div className={styles.notificationHeader}>
                      <Icon name="idea" size={20} />
                      <div className={styles.textContainer}>
                        <div className={styles.titleRow}>
                          <Text variant="H4" className={styles.readText}>
                            {n.user} {n.text}
                          </Text>
                          <Text variant="Caption" className={styles.date}>
                            {n.date}
                          </Text>
                        </div>
                        <Text variant="Body">{getDescription(n)}</Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!localNotifications.length && (
              <div className={styles.emptyState}>
                <Icon name="idea" size={32} />
                <Text variant="Caption">Нет уведомлений</Text>
              </div>
            )}
          </div>
        </div>
      </MenuWrapper>
    </>
  )
}
