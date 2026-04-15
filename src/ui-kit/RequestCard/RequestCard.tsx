import { Button } from '@/ui-kit'
import type { TExchange, TUser } from '@/utils'

import styles from './RequestCard.module.css'

type Props = {
  exchange: TExchange
  users: TUser[]
  currentUserId?: string
  onAccept: (id: string) => void
  onDecline: (id: string) => void
}

export const RequestCard = ({ exchange, users, currentUserId, onAccept, onDecline }: Props) => {
  // Получаем участников обмена
  const fromUser = users.find((u) => u.id === exchange.fromUserId)
  const toUser = users.find((u) => u.id === exchange.toUserId)

  // Находим конкретные навыки, участвующие в обмене
  const fromSkill = fromUser?.skills.find((s) => s.id === exchange.fromSkillId)
  const toSkill = toUser?.skills.find((s) => s.id === exchange.toSkillId)

  // Определяем роль текущего пользователя в обмене
  const isIncoming = currentUserId === exchange.toUserId
  const isOutgoing = currentUserId === exchange.fromUserId

  const partner = isIncoming ? fromUser : toUser

  return (
    <article className={styles.card}>
      <div className={styles.skillsBlock}>
        <div className={styles.skills}>
          {isOutgoing ? 'Вы предлагаете' : 'Вам предлагают'}: <b>{fromSkill?.title ?? ''}</b>
        </div>

        <div className={styles.skills}>
          Взамен: <b>{toSkill?.title ?? ''}</b>
        </div>
      </div>

      <div className={styles.infoBlock}>
        {isIncoming
          ? `${partner?.name ?? 'Пользователь'} предложил(а) обмен`
          : isOutgoing
            ? `Вы предложили обмен пользователю: ${partner?.name ?? ''}`
            : 'Заявка на обмен'}
      </div>

      {/* Действия для заявок */}
      <div className={styles.actions}>
        {/* Входящая заявка */}
        {isIncoming && (
          <>
            <Button onClick={() => onAccept(exchange.id)}>Принять</Button>

            <Button variant="secondary" onClick={() => onDecline(exchange.id)}>
              Отклонить
            </Button>
          </>
        )}

        {/* Исходящая заявка */}
        {isOutgoing && (
          <Button variant="secondary" onClick={() => onDecline(exchange.id)}>
            Отменить заявку
          </Button>
        )}
      </div>
    </article>
  )
}
