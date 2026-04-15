import type { AppDispatch, RootState } from '@/store'
import { getActiveExchanges, scheduleExchange } from '@/store/exchanges-slice'
import { ExchangeCard, Text } from '@/ui-kit'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ProfileExchanges.module.css'

export const ProfileExchanges = () => {
  const dispatch = useDispatch<AppDispatch>()

  // Текущий юзер и все юзеры
  const userId = useSelector((state: RootState) => state.user.user?.id) ?? ''
  const users = useSelector((state: RootState) => state.users.users)

  // Подтвержденные обмены
  const activeExchanges = useSelector((state: RootState) => getActiveExchanges(state, userId))

  const handleSchedule = (payload: { id: string; start: string; end: string }) => {
    dispatch(scheduleExchange(payload))
  }

  return (
    <div className={styles.wrapper}>
      <Text variant="H2">Мои обмены</Text>

      {activeExchanges.length === 0 ? (
        <Text>Активных обменов нет</Text>
      ) : (
        <div className={styles.list}>
          {activeExchanges.map((exchange) => (
            <ExchangeCard
              key={exchange.id}
              exchange={exchange}
              currentUserId={userId}
              users={users}
              onSchedule={handleSchedule}
            />
          ))}
        </div>
      )}
    </div>
  )
}
