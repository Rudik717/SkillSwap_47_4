import type { RootState } from '@/store'
import { checkAndNotifyLevelUp, getLevelByCount } from '@/utils/sageHelpers'
import { SageLevel } from '@/widgets/SageAvatar/SageAvatar'
import type { TSageLevel } from '@/widgets/SageAvatar/type'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export const useSageProgress = (userId: string | undefined) => {
  const exchanges = useSelector((state: RootState) => state.exchanges.exchanges)
  const [level, setLevel] = useState<TSageLevel>(() => {
    if (userId) {
      const saved = localStorage.getItem(`sage_level_${userId}`)
      if (saved) {
        return Number(saved) as TSageLevel
      }
    }
    return SageLevel.BABY
  })
  const dispatch = useDispatch()
  // был ли уже показан тост повышения -  не даёт показать тост дважды за одну сессию
  const hasShownLevelUp = useRef(false)
  const prevUserId = useRef(userId)

  useEffect(() => {
    // Сброс флагов при смене пользователя
    if (prevUserId.current !== userId) {
      hasShownLevelUp.current = false
      prevUserId.current = userId
    }
    if (!userId) return
    // раньше обмены записывались в local storage, реализваяи изменилась, теперь
    // сохраняется в store - скорректировала свою реализацию
    // флаги и сохранение уровня все равно оставлю в local storage
    const userExchanges = exchanges.filter((exchange) => exchange.fromUserId === userId)

    const count = userExchanges.length

    const newLevel = getLevelByCount(count)

    if (newLevel > level && !hasShownLevelUp.current) {
      hasShownLevelUp.current = true
      checkAndNotifyLevelUp(userId, dispatch, level, newLevel)
    }

    setLevel(newLevel)
  }, [userId, level, dispatch, exchanges])

  return level
}
