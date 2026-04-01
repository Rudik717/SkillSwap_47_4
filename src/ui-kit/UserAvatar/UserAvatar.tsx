import { Avatar } from '../Avatar/Avatar'
import { Text } from '../Text/Text'
import styles from './UserAvatar.module.css'

interface UserAvatarProps {
  name?: string
  url?: string
  size?: number
}

export const UserAvatar = ({ name, url, size = 48 }: UserAvatarProps) => {
  const displayName = name || 'Пользователь'
  return (
    <div className={styles.userAvatar}>
      <Text color="black" className={styles.userName}>
        {displayName}
      </Text>
      <Avatar url={url} alt={`${name}'s avatar`} size={size} />
    </div>
  )
}
