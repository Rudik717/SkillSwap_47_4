import { isFilterActiveSelector } from '@/store/filter'
import {
  filteredUsersSelector,
  newUsersSelector,
  popularUsersSelector,
  recommendedUsersSelector,
} from '@/store/users'
import { UsersGrid } from '@/widgets'
import { ActiveFilterChips } from '@/widgets/FilterPanel/ActiveFilterChips'
import { FilterPanel } from '@/widgets/FilterPanel/FilterPanel'
import { useSelector } from 'react-redux'

import styles from './Home.module.css'

export const Home = () => {
  const isFilterActive = useSelector(isFilterActiveSelector)

  return (
    <div className={styles.container}>
      <FilterPanel />
      {isFilterActive ? <WithFilters /> : <WithoutFilters />}
    </div>
  )
}

const WithFilters = () => {
  const filteredUsers = useSelector(filteredUsersSelector)
  const matchCount = filteredUsers.length

  return (
    <div className={styles.main}>
      <ActiveFilterChips />
      <UsersGrid users={filteredUsers} title={`Подходящие предложения: ${matchCount}`} />
    </div>
  )
}

const WithoutFilters = () => {
  const popularUsers = useSelector(popularUsersSelector)
  const newUsers = useSelector(newUsersSelector)
  const recommendedUsers = useSelector(recommendedUsersSelector)

  return (
    <div className={styles.main}>
      <ActiveFilterChips />
      <div className={styles.cards}>
        <UsersGrid users={popularUsers} title="Популярное" />
        <UsersGrid users={newUsers} title="Новое" />
        <UsersGrid users={recommendedUsers} title="Рекомендуем" />
      </div>
    </div>
  )
}
