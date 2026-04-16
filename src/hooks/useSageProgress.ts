import { checkAndNotifyLevelUp, getLevelByCount } from '@/utils/sageHelpers'
import { SageLevel } from '@/widgets/SageAvatar/SageAvatar'
import type { TSageLevel } from '@/widgets/SageAvatar/type'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

export const useSageProgress = (userId: string | undefined) => {
  const [level, setLevel] = useState<TSageLevel>(() => {
    if (userId) {
      const saved = localStorage.getItem(`sage_level_${userId}`)
      if (saved) return Number(saved) as TSageLevel
    }
    return SageLevel.BABY
  })
  const dispatch = useDispatch()
  const hasShownLevelUp = useRef(false)
  const prevUserId = useRef(userId)

  useEffect(() => {
    // Сброс флагов при смене пользователя
    if (prevUserId.current !== userId) {
      hasShownLevelUp.current = false
      prevUserId.current = userId
    }
    if (!userId) return

    const stringRequest = localStorage.getItem(`requests_${userId}`)
    if (!stringRequest) {
      setLevel(SageLevel.BABY)
      return
    }
    const arrayRequest = JSON.parse(stringRequest)
    const count = arrayRequest.length

    const newLevel = getLevelByCount(count)

    if (newLevel > level && !hasShownLevelUp.current) {
      hasShownLevelUp.current = true
      checkAndNotifyLevelUp(userId, dispatch, level, newLevel)
    }

    setLevel(newLevel)
  }, [userId, level, dispatch])

  return level
}
