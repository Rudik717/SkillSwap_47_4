import { addToast } from '@/store/notifications'
import { SageLevel } from '@/widgets/SageAvatar/SageAvatar'
import type { TSageLevel } from '@/widgets/SageAvatar/type'
import type { Dispatch } from '@reduxjs/toolkit'

export const getLevelByCount = (count: number): TSageLevel => {
  if (count >= 6) return SageLevel.GURU
  if (count >= 4) return SageLevel.MENTOR
  if (count >= 2) return SageLevel.STUDENT
  return SageLevel.BABY
}

// Проверить, нужно ли показывать тост о повышении
export const checkAndNotifyLevelUp = (
  userId: string,
  dispatch: Dispatch,
  currentLevel: TSageLevel,
  newLevel: TSageLevel
) => {
  if (newLevel > currentLevel) {
    const toastKey = `sage_toast_shown_${userId}_${newLevel}`
    const alreadyShown = localStorage.getItem(toastKey)

    if (alreadyShown) return false

    localStorage.setItem(toastKey, 'true')
    localStorage.setItem(`sage_level_${userId}`, String(newLevel))
    const text =
      newLevel === SageLevel.STUDENT
        ? '🌿 Твоё дерево Знаний проросло! Продолжай расти! 📱'
        : newLevel === SageLevel.MENTOR
          ? '🌳 Твоё дерево окрепло! Ты ментор знаний! ⌚'
          : '👑 Твоё дерево стало могучим дубом! Гуру SkillSwap! ✨'

    dispatch(
      addToast({
        id: `sage_levelup_${Date.now()}`,
        user: '',
        text,
        date: new Date().toISOString(),
        isRead: false,
        link: '/profile',
      })
    )
    localStorage.setItem(`sage_level_${userId}`, String(newLevel))
    return true
  }
  return false
}
