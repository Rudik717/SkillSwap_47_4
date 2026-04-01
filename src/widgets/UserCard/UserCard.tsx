import { Avatar } from '@/ui-kit'
import { type FC, memo } from 'react'

import styles from './UserCard.module.css'
import type { TUserCardProps } from './type'

export const UserCard: FC<TUserCardProps> = memo(({ user }) => {
  return (
    <article className={styles['user-card']}>
      <div className={styles['user-card__header']}>
        <Avatar url={user.url ?? ''}></Avatar>
      </div>
      <div className={styles['user-card__info']}></div>
    </article>
  )
})
