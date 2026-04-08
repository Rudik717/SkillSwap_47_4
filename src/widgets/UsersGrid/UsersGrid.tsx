import { Button, Text } from '@/ui-kit'
import type { TUser } from '@/utils/types'
import { UserCard } from '@/widgets'
import type { ComponentProps, Ref } from 'react'

import styles from './UsersGrid.module.css'

type ButtonVariant = ComponentProps<typeof Button>['variant']
type ButtonIcon = ComponentProps<typeof Button>['iconLeft']

interface UsersGridButtonProps {
  label: string
  onClick: () => void
  variant?: ButtonVariant
  iconLeft?: ButtonIcon
  iconRight?: ButtonIcon
}

interface UsersGridProps {
  users: TUser[]
  title?: string
  button?: UsersGridButtonProps
  columns?: number
  loadMoreRef?: Ref<HTMLDivElement>
}

export const UsersGrid = ({ users, title, button, columns = 3, loadMoreRef }: UsersGridProps) => {
  return (
    <div className={styles.container}>
      {title || button ? (
        <div className={styles.header}>
          <Text variant="H1">{title}</Text>
          {button ? (
            <div>
              <Button
                variant={button.variant}
                iconLeft={button.iconLeft}
                iconRight={button.iconRight}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            </div>
          ) : null}
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
