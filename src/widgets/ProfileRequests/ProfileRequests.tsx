import type { AppDispatch, RootState } from '@/store'
import {
  acceptExchange,
  cancelExchange,
  declineExchange,
  getIncomingRequests,
  getOutgoingRequests,
} from '@/store/exchanges-slice'
import { fetchNotifications } from '@/store/notifications'
import { RequestCard, Text } from '@/ui-kit'
import type { ExchangeAction } from '@/ui-kit/RequestCard/RequestCard'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ProfileRequests.module.css'

export const ProfileRequests = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Получаем текущего юзера и список всех юзеров
  const userId = useSelector((state: RootState) => state.user.user?.id) ?? ''
  const users = useSelector((state: RootState) => state.users.users)
  const user = useSelector((state: RootState) => state.user.user)

  // Входящие заявки
  const incoming = useSelector((state: RootState) => getIncomingRequests(state, userId))

  // Исходящие заявки
  const outgoing = useSelector((state: RootState) => getOutgoingRequests(state, userId))

  // Универсальный обработчик действий
  const handleAction = (id: string, type: ExchangeAction) => {
    switch (type) {
      case 'accept':
        dispatch(acceptExchange(id))
        if (user?.id) {
          dispatch(fetchNotifications(user.id))
        }
        break

      case 'decline':
        dispatch(declineExchange(id))
        if (user?.id) {
          dispatch(fetchNotifications(user.id))
        }
        break

      case 'cancel':
        dispatch(cancelExchange(id))
        if (user?.id) {
          dispatch(fetchNotifications(user.id))
        }
        break

      default:
        break
    }
  }

  return (
    <div className={styles.wrapper}>
      <Text variant="H2">Заявки</Text>
      <section className={styles.content}>
        {/* Входящие */}
        <div className={styles.requestSection}>
          <Text variant="H3">Входящие {incoming.length > 0 && `(${incoming.length})`}</Text>

          {incoming.length === 0 ? (
            <Text>Входящих заявок нет</Text>
          ) : (
            <div className={styles.list}>
              {incoming.map((exchange) => (
                <RequestCard
                  key={exchange.id}
                  exchange={exchange}
                  users={users}
                  currentUserId={userId}
                  onAction={handleAction}
                />
              ))}
            </div>
          )}
        </div>

        {/* Исходящие */}
        <div className={styles.requestSection}>
          <Text variant="H3">Исходящие {outgoing.length > 0 && `(${outgoing.length})`}</Text>

          {outgoing.length === 0 ? (
            <Text>Исходящих заявок нет</Text>
          ) : (
            <div className={styles.list}>
              {outgoing.map((exchange) => (
                <RequestCard
                  key={exchange.id}
                  exchange={exchange}
                  users={users}
                  currentUserId={userId}
                  onAction={handleAction}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
