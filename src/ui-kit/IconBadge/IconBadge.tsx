import type { ReactNode } from 'react'

import styles from './IconBadge.module.css'

interface IconBadgeProps {
  isVisible?: boolean
  children: ReactNode
  iconSize?: number
}

export const IconBadge = ({ isVisible = false, children, iconSize = 24 }: IconBadgeProps) => {
  const badgeSize = iconSize / 2
  const offset = iconSize / 2

  return (
    <div className={styles.container}>
      {children}
      {isVisible && (
        <div
          className={styles.badge}
          style={{ width: badgeSize, height: badgeSize, left: offset }}
        />
      )}
    </div>
  )
}
