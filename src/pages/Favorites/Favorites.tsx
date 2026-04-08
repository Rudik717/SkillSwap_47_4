import { type RootState } from '@/store'
import { recommendedUsersSelector } from '@/store/users'
import { Text } from '@/ui-kit'
import { UsersGrid } from '@/widgets'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './Favorites.module.css'

export const Favorites = () => {
  const navigate = useNavigate()
  const users = useSelector((state: RootState) => recommendedUsersSelector(state))

  // Заглушки
  const mockIsLoggedIn = true
  //const mockFavoriteIds = ['1', '2']

  // Редирект на логин, если юзер не авторизован
  useEffect(() => {
    if (!mockIsLoggedIn) navigate('/login')
  }, [mockIsLoggedIn, navigate])

  // Заглушка, чтобы показать как выглядит избранное
  const favoriteUsers = users.slice(0, 6)

  // const favoriteUsers = users.filter((user) =>
  //   user.skills?.some((skill) => mockFavoriteIds.includes(skill.id))
  // )

  return (
    <div className={styles.pageWrapper}>
      <Text variant="H2">Избранное</Text>

      {favoriteUsers.length === 0 ? (
        <Text variant="Body">Список избранного пуст</Text>
      ) : (
        <UsersGrid users={favoriteUsers} columns={4} />
      )}
    </div>
  )
}
