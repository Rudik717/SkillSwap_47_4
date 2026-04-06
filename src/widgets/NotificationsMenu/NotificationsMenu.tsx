import { Button, Icon, Text } from '@/ui-kit'
import { MenuWrapper } from '@/widgets'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
}

export const NotificationsMenu = ({
  isOpen,
  onClose,
  triggerRef,
  notifications = [],
}: NotificationsMenuProps) => {
  const [localNotifications, setLocalNotifications] = useState<Notification[]>(notifications)
  const navigate = useNavigate()

  const handleMarkAllAsRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const handleClearRead = () => {
    setLocalNotifications((prev) => prev.filter((n) => !n.isRead))
  }

  const handleNavigate = (link?: string) => {
    if (link) {
      navigate(link)
      onClose()
    }
  }

  const getDescription = (notification: Notification) => {
    return notification.text.includes('принял')
      ? 'Перейдите в профиль, чтобы обсудить детали'
      : 'Примите обмен, чтобы обсудить детали'
  }

  const unreadNotifications = localNotifications.filter((n) => !n.isRead)
  const readNotifications = localNotifications.filter((n) => n.isRead)

  return (
    <MenuWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef} position="bottom-right">
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
                    <Button
                      variant="primary"
                      className={styles.goButton}
                      onClick={() => handleNavigate(n.link)}
                    >
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

          {localNotifications.length === 0 && (
            <div className={styles.emptyState}>
              <Icon name="idea" size={32} />
              <Text variant="Caption">Нет уведомлений</Text>
            </div>
          )}
        </div>
      </div>
    </MenuWrapper>
  )
}
