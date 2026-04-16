import { addToast } from '@/store/notifications'
import { SageLevel } from '@/widgets/SageAvatar/SageAvatar'
import type { TSageLevel } from '@/widgets/SageAvatar/type'
import type { Dispatch } from '@reduxjs/toolkit'
import confetti from 'canvas-confetti'

// определяет, какой уровень у пользователя
export const getLevelByCount = (count: number): TSageLevel => {
  if (count >= 6) return SageLevel.GURU
  if (count >= 4) return SageLevel.MENTOR
  if (count >= 2) return SageLevel.STUDENT
  return SageLevel.BABY
}

// Проверяет, нужно ли показывать тост о повышении
export const checkAndNotifyLevelUp = (
  userId: string,
  dispatch: Dispatch,
  currentLevel: TSageLevel,
  newLevel: TSageLevel
) => {
  if (newLevel > currentLevel) {
    // создаю ключ и сохраняю в localStorage - чтобы понять, что уведомление пользователю уже показывали
    const toastKey = `sage_toast_shown_${userId}_${newLevel}`
    const alreadyShown = localStorage.getItem(toastKey)

    if (alreadyShown) return

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#f59e0b', '#10b981'],
    })

    localStorage.setItem(toastKey, 'true')
    localStorage.setItem(`sage_level_${userId}`, String(newLevel))
    /* Поменяла концепцию в связи с изменением реализации
          теперь шаги к знаниям, поэтому если пользователь отменит заявку я не убираю достижение
          тк шаг к знаниям все равно был сделан - так позволит сохранить мотивацию пользователя и общую концепцию - 
          дерево знаний растет, когда пользователь делает шаги  */
    const text =
      newLevel === SageLevel.STUDENT
        ? '🌿 Твоё дерево Знаний проросло! 2 шага к знаниям сделано! Продолжай расти! 📱'
        : newLevel === SageLevel.MENTOR
          ? '🌳 Твоё дерево Знаний окрепло! 4 шага к знаниям сделано! Ты ментор знаний! ⌚'
          : '👑 Твоё дерево Знаний стало могучим дубом! 6 шагов к знаниям сделано! Ты - Гуру SkillSwap! ✨'

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
  }
}
