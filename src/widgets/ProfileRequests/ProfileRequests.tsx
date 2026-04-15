import type { AppDispatch, RootState } from '@/store'
import {
  acceptExchange,
  declineExchange,
  getIncomingRequests,
  getOutgoingRequests,
} from '@/store/exchanges-slice'
import { RequestCard, Text } from '@/ui-kit'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ProfileRequests.module.css'

export const ProfileRequests = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Получаем текущего юзера и список всех юзеров
  const userId = useSelector((state: RootState) => state.user.user?.id) ?? ''
  const users = useSelector((state: RootState) => state.users.users)

  // Входящие заявки
  const incoming = useSelector((state: RootState) => getIncomingRequests(state, userId))

  // Исходящие заявки
  const outgoing = useSelector((state: RootState) => getOutgoingRequests(state, userId))

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
                  onAccept={(id) => dispatch(acceptExchange(id))}
                  onDecline={(id) => dispatch(declineExchange(id))}
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
                  onAccept={(id) => dispatch(acceptExchange(id))}
                  onDecline={(id) => dispatch(declineExchange(id))}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
