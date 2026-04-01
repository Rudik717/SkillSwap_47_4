import { Button, Text } from '@/ui-kit'
import type { TUser } from '@/utils/types'
import { UserCard } from '@/widgets'

import styles from './UsersGrid.module.css'

interface UsersGridProps {
  users: TUser[] // ← используем готовый тип
  title?: string
  button?: {
    label: string
    onClick: () => void
  }
  columns?: number
}

export const UsersGrid = ({ users, title, button, columns = 3 }: UsersGridProps) => {
  return (
    <div className={styles.container}>
      {(title || button) && (
        <div className={styles.header}>
          {title && <Text variant="H1">{title}</Text>}
          {button && <Button onClick={button.onClick}>{button.label}</Button>}
        </div>
      )}
      <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
