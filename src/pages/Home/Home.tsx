import { useInfiniteScroll } from '@/hooks'
import type { AppDispatch } from '@/store'
import { getFilterState, isFilterActiveSelector, setSort } from '@/store/filter'
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
import { useDispatch, useSelector } from 'react-redux'

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

  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector(getFilterState)
  const filteredUsers = useSelector(filteredUsersSelector)
  const isFilterActive = useSelector(isFilterActiveSelector)

  const count = PAGE_SIZE * page
  const users = filteredUsers.slice(0, count)
  const hasMore = filteredUsers.length > count

  useEffect(() => {
    setPage(1)
  }, [filteredUsers])

  const loadMore = () => {
    console.log(' *** load more')
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setPage((currentPage) => currentPage + 1)
    }, 3000)
  }

  const loadMoreRef = useInfiniteScroll({
    loadMore,
    hasMore,
    isLoading,
  })

  const isDesc = filter.sort.direction === 'desc'

  const handleSortToggle = () => {
    dispatch(setSort({ by: 'createdAt', direction: isDesc ? 'asc' : 'desc' }))
  }

  return (
    <div className={styles.main}>
      <FilterChips />
      <UsersGrid
        users={users}
        title={users.length ? `Найдено пользователей: ${users.length}` : 'Ничего не найдено'}
        button={
          isFilterActive
            ? {
                label: isDesc ? 'Сначала новые' : 'Сначала старые',
                onClick: handleSortToggle,
                variant: 'tertiary',
                iconLeft: 'sort',
              }
            : undefined
        }
        loadMoreRef={loadMoreRef}
      />
      {isLoading ? <Loading /> : null}
    </div>
  )
}

const WithoutFilters = () => {
  const dispatch = useDispatch<AppDispatch>()
  const popularUsers = useSelector(popularUsersSelector)
  const newUsers = useSelector(newUsersSelector)
  const recommendedUsers = useSelector(recommendedUsersSelector)

  return (
    <div className={styles.main}>
      <div className={styles.cards}>
        <UsersGrid
          users={popularUsers}
          title="Популярное"
          button={{
            label: 'Смотреть все',
            onClick: () => dispatch(setSort({ by: 'likes', direction: 'desc' })),
            variant: 'tertiary',
            iconRight: 'right-switch',
          }}
        />

        <UsersGrid
          users={newUsers}
          title="Новое"
          button={{
            label: 'Смотреть все',
            onClick: () => dispatch(setSort({ by: 'createdAt', direction: 'desc' })),
            variant: 'tertiary',
            iconRight: 'right-switch',
          }}
        />

        <UsersGrid users={recommendedUsers} title="Рекомендуем" />
      </div>
    </div>
  )
}
