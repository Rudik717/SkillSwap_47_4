import type { TExchange, TExchangeStatus, TUser } from '@/utils'

import { Button } from '../Button/Button'
import styles from './ExchangeCard.module.css'

type Props = {
  exchange: TExchange
  users: TUser[]
  currentUserId?: string
  onSchedule?: (payload: { id: string; start: string; end: string }) => void
}

export const getStatusLabel = (status: TExchangeStatus) => {
  switch (status) {
    case 'pending':
      return 'Ожидает ответа'
    case 'accepted':
      return 'Принят'
    case 'declined':
      return 'Отклонен'
    case 'scheduled':
      return 'Встреча назначена'
    case 'cancelled':
      return 'Отменен'
    default:
      return status
  }
}

export const ExchangeCard = ({ exchange, users, currentUserId, onSchedule }: Props) => {
  // Находим участников обмена
  const fromUser = users.find((u) => u.id === exchange.fromUserId)
  const toUser = users.find((u) => u.id === exchange.toUserId)

  // Находим навыки, участвующие в обмене
  const fromSkill = fromUser?.skills?.find((s) => s.id === exchange.fromSkillId)
  const toSkill = toUser?.skills?.find((s) => s.id === exchange.toSkillId)

  // Определяем, кто инициатор: текущий пользователь или нет
  const isFromMe = currentUserId === exchange.fromUserId
  const partner = isFromMe ? toUser : fromUser

  // Генерация и скачивание .ics файла, чтобы добавить встречу в календарь
  const handleAddToCalendar = () => {
    if (!exchange.meetingStart || !exchange.meetingEnd) return

    const formatDateUTC = (dateString: string) => {
      return new Date(dateString)
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '')
    }

    const start = formatDateUTC(exchange.meetingStart)
    const end = formatDateUTC(exchange.meetingEnd)
    const now = formatDateUTC(new Date().toISOString())

    // Заголовок и описание события
    const title = `Обмен навыками с партнёром: ${partner?.name ?? ''}`
    const description = isFromMe
      ? `Вы обучаете "${fromSkill?.title ?? ''}" и изучаете "${toSkill?.title ?? ''}".`
      : `Вы изучаете "${fromSkill?.title ?? ''}" и обучаете "${toSkill?.title ?? ''}".`

    // Формируем .ics файл
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SkillSwap//EN
BEGIN:VEVENT
UID:${exchange.id}@skillswap
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`

    // Создание файла для скачивания
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `exchange-${exchange.id}.ics`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  return (
    <article className={styles.card}>
      <div className={styles.skillsBlock}>
        <div className={styles.skills}>
          {isFromMe ? 'Вы обучаете' : 'Вы изучаете'}: <b>{fromSkill?.title ?? '—'}</b>
        </div>

        <div className={styles.skills}>
          {isFromMe ? 'Вы изучаете' : 'Вы обучаете'}: <b>{toSkill?.title ?? '—'}</b>
        </div>
      </div>

      <div className={styles.partner}>Партнер: {partner?.name ?? '—'}</div>

      <div className={styles.status}>Статус: {getStatusLabel(exchange.status)}</div>

      <div className={styles.actions}>
        {/* Обмен принят, назначаем встречу */}
        {exchange.status === 'accepted' && (
          <Button
            variant="primary"
            iconLeft="calendar"
            onClick={() =>
              onSchedule?.({
                id: exchange.id,
                start: new Date().toISOString(),
                end: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
              })
            }
            ariaLabel="Назначить встречу"
          >
            Назначить встречу
          </Button>
        )}

        {/* Встреча назначена, добавляем в календарь */}
        {exchange.status === 'scheduled' && exchange.meetingStart && exchange.meetingEnd && (
          <Button
            variant="secondary"
            iconLeft="calendar"
            onClick={handleAddToCalendar}
            ariaLabel="Добавить событие в календарь"
          >
            Добавить в календарь
          </Button>
        )}
      </div>
    </article>
  )
}
