import { Button, Text } from '@/ui-kit'
import type { TUser } from '@/utils/types'
import { UserCard } from '@/widgets'
import { type Ref } from 'react'

import styles from './UsersGrid.module.css'

interface UsersGridProps {
  users: TUser[]
  title?: string
  button?: {
    label: string
    onClick: () => void
  }
  columns?: number
  loadMoreRef?: Ref<HTMLDivElement>
}

export const UsersGrid = ({ users, title, button, columns = 3, loadMoreRef }: UsersGridProps) => {
  return (
    <div className={styles.container}>
      {title || button ? (
        <div className={styles.header}>
          {title && <Text variant="H1">{title}</Text>}
          {button && (
            <div>
              <Button onClick={button.onClick}>{button.label}</Button>
            </div>
          )}
        </div>
      ) : null}

      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, auto)` }}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
        <div className={styles.loadMore} ref={loadMoreRef} />
      </div>
    </div>
  )
}
