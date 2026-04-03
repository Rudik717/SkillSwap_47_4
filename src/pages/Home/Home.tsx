import { isFilterActiveSelector } from '@/store/filter'
import {
  filteredUsersSelector,
  newUsersSelector,
  popularUsersSelector,
  recommendedUsersSelector,
} from '@/store/users'
import { UsersGrid } from '@/widgets'
import { FilterPanel } from '@/widgets/FilterPanel/FilterPanel'
import { useSelector } from 'react-redux'

import styles from './Home.module.css'

export const Home = () => {
  const isFilterActive = useSelector(isFilterActiveSelector)
  const popularUsers = useSelector(popularUsersSelector)
  const newUsers = useSelector(newUsersSelector)
  const recommendedUsers = useSelector(recommendedUsersSelector)
  const filteredUsers = useSelector(filteredUsersSelector)

  return (
    <div className={styles.container}>
      <FilterPanel />
      {isFilterActive ? (
        <UsersGrid users={filteredUsers} title="Подходящие предложения:" />
      ) : (
        <div className={styles.cards}>
          <UsersGrid users={popularUsers} title="Популярное" />
          <UsersGrid users={newUsers} title="Новое" />
          <UsersGrid users={recommendedUsers} title="Рекомендуем" />
        </div>
      )}
    </div>
  )
}
