import { type RootState } from '@/store'
import { Text } from '@/ui-kit'
import { UsersGrid } from '@/widgets'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './Favorites.module.css'

export const Favorites = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.user)
  const allUsers = useSelector((state: RootState) => state.users.users)

  // Если пользователь не авторизован, редирект на логин
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  // Массив пользователей, которых текущий пользователь лайкнул
  const userFavorites = user?.favorites || []

  const favoriteUsers = useMemo(
    () => allUsers.filter((u) => userFavorites.includes(u.id)),
    [allUsers, userFavorites]
  )

  return (
    <div className={styles.pageWrapper}>
      <Text variant="H2">Избранное</Text>

      {favoriteUsers.length === 0 ? (
        <Text variant="Body">Список избранного пуст</Text>
      ) : (
        <UsersGrid users={favoriteUsers} columns={3} />
      )}
    </div>
  )
}
