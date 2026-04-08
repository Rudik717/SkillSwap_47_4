import { useInfiniteScroll } from '@/hooks'
import { getFilterState, isFilterActiveSelector } from '@/store/filter'
import {
  filteredUsersSelector,
  newUsersSelector,
  popularUsersSelector,
  recommendedUsersSelector,
} from '@/store/users'
import { Loading, UsersGrid } from '@/widgets'
import { FilterChips } from '@/widgets'
import { FilterPanel } from '@/widgets/FilterPanel/FilterPanel'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './Home.module.css'

const PAGE_SIZE = 9

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
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const filter = useSelector(getFilterState)
  const filteredUsers = useSelector(filteredUsersSelector)
  const count = PAGE_SIZE * page
  const users = filteredUsers.slice(0, count)
  const hasMore = filteredUsers.length > count

  useEffect(() => {
    setPage(1)
  }, [filter])

  const loadMore = () => {
    setIsLoading(true)

    // Emulate loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false)
      setPage((currentPage) => currentPage + 1)
    }, 3000)
  }

  const loadMoreRef = useInfiniteScroll({ hasMore, loadMore, isLoading })

  return (
    <div className={styles.main}>
      <FilterChips />
      <UsersGrid
        users={users}
        title={`Подходящие предложения: ${users.length}`}
        loadMoreRef={loadMoreRef}
      />
      {isLoading ? <Loading /> : null}
    </div>
  )
}

const WithoutFilters = () => {
  const popularUsers = useSelector(popularUsersSelector)
  const newUsers = useSelector(newUsersSelector)
  const recommendedUsers = useSelector(recommendedUsersSelector)

  return (
    <div className={styles.main}>
      <div className={styles.cards}>
        <UsersGrid users={popularUsers} title="Популярное" />
        <UsersGrid users={newUsers} title="Новое" />
        <UsersGrid users={recommendedUsers} title="Рекомендуем" />
      </div>
    </div>
  )
}
