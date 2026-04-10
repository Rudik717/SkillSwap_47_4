import { useState } from 'react'

import { Text } from '../Text/Text'
import styles from './Avatar.module.css'

type AvatarProps = {
  url?: string
  alt?: string
  size?: number
  fallback?: string
}

export const Avatar = ({ url, alt = 'User avatar', size = 100, fallback }: AvatarProps) => {
  const [hasError, setHasError] = useState(false)

  if (!url || hasError) {
    return (
      <Text
        variant="Body"
        className={styles.emptyAvatar}
        style={{ width: size, height: size, fontSize: size / 2 }}
      >
        {fallback}
      </Text>
    )
  }
  return (
    <div className={styles.avatar} style={{ width: size, height: size }}>
      <img src={url} alt={alt} className={styles.image} onError={() => setHasError(true)} />
    </div>
  )
}
