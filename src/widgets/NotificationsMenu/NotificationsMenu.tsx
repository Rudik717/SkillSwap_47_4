// NotificationsMenu.tsx - упрощенная версия без внутреннего Toast
import type { AppDispatch } from '@/store'
import {
  clearReadNotifications,
  markAllAsRead,
  selectNotifications,
  selectReadNotifications,
  selectUnreadNotifications,
} from '@/store/notifications'
import { Button, Icon, Text } from '@/ui-kit'
import { MenuWrapper } from '@/widgets'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './NotificationsMenu.module.css'

interface NotificationsMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
}

export const NotificationsMenu = ({ isOpen, onClose, triggerRef }: NotificationsMenuProps) => {
  const dispatch = useDispatch<AppDispatch>()

  const notifications = useSelector(selectNotifications)
  const unreadNotifications = useSelector(selectUnreadNotifications)
  const readNotifications = useSelector(selectReadNotifications)

  const handleMarkAllAsRead = async () => {
    await dispatch(markAllAsRead())
  }

  const handleClearRead = async () => {
    await dispatch(clearReadNotifications())
  }

  const getDescription = (n: (typeof unreadNotifications)[0]) =>
    n.text.includes('принял')
      ? 'Перейдите в профиль, чтобы обсудить детали'
      : 'Примите обмен, чтобы обсудить детали'

  function parseRuDate(dateString: string): Date {
    const [day, month, year] = dateString.split('.')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  function formatDate(dateString: string): string {
    const date = parseRuDate(dateString)

    const today = new Date()
    const yesterday = new Date()

    yesterday.setDate(today.getDate() - 1)

    const normalize = (d: Date) => {
      const copy = new Date(d)
      copy.setHours(0, 0, 0, 0)
      return copy
    }

    const isSameDay = (d1: Date, d2: Date) => normalize(d1).getTime() === normalize(d2).getTime()

    if (isSameDay(date, today)) return 'сегодня'
    if (isSameDay(date, yesterday)) return 'вчера'

    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
    })
  }

  return (
    <MenuWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef} position="top-right">
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
                    <Icon name="idea" size={40} />
                    <div className={styles.textContainer}>
                      <div className={styles.titleRow}>
                        <Text variant="H4">
                          {n.user} {n.text}
                        </Text>
                        <Text variant="Caption" className={styles.date}>
                          {formatDate(n.date)}
                        </Text>
                      </div>
                      <Text variant="Caption">{getDescription(n)}</Text>
                    </div>
                  </div>
                  {n.link && (
                    <Button
                      variant="primary"
                      className={styles.goButton}
                      onClick={() => {
                        onClose()
                      }}
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
                    <Icon name="idea" size={40} />
                    <div className={styles.textContainer}>
                      <div className={styles.titleRow}>
                        <Text variant="H4" className={styles.readText}>
                          {n.user} {n.text}
                        </Text>
                        <Text variant="Caption" className={styles.date}>
                          {formatDate(n.date)}
                        </Text>
                      </div>
                      <Text variant="Caption">{getDescription(n)}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {notifications.length === 0 && (
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
