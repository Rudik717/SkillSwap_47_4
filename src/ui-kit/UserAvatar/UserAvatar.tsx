import type { RootState } from '@/store'
import { useSelector } from 'react-redux'

import { Avatar } from '../Avatar/Avatar'
import { Text } from '../Text/Text'
import styles from './UserAvatar.module.css'

interface UserAvatarProps {
  size?: number
}
export const UserAvatar = ({ size = 48 }: UserAvatarProps) => {
  const { user } = useSelector((state: RootState) => state.user)

  const userName = user?.name || 'Пользователь'
  const firstLetter = userName.charAt(0).toUpperCase()
  const avatarUrl = user?.avatar

  return (
    <div className={styles.userAvatar}>
      <Text color="var(--text)" className={styles.userName}>
        {userName}
      </Text>
      <Avatar url={avatarUrl} alt={`${userName}'s avatar`} size={size} fallback={firstLetter} />
    </div>
  )
}
