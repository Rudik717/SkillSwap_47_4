import { useInfiniteScroll } from '@/hooks'
import { useSageProgress } from '@/hooks/useSageProgress'
import type { AppDispatch, RootState } from '@/store'
import { getFilterState, isFilterActiveSelector, setSort } from '@/store/filter'
import { addToast } from '@/store/notifications'
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
  // меняю реализацию для бейджей, чтобы читалось из store, тк изменилась реализация
  // хранения заявок на обмены: было в local storage, стало в store
  const exchanges = useSelector((state: RootState) => state.exchanges.exchanges)
  const isFilterActive = useSelector(isFilterActiveSelector)
  const user = useSelector((state: RootState) => state.user.user)
  useSageProgress(user?.id)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user?.id) return
    // меняю реализацию для бейджей, чтобы читалось из store, тк изменилась реализация
    // хранения заявок на обмены: было в local storage, стало в store
    // welcomeShown - флаг - оставляю в local storage, чтобы понимать, было уведомление-приветствие или нет
    const userExchanges = exchanges.filter((exchange) => exchange.fromUserId === user?.id)
    const count = userExchanges.length
    const welcomeShown = localStorage.getItem(`sage_welcome_${user.id}`)
    if (count === 0 && !welcomeShown) {
      localStorage.setItem(`sage_welcome_${user.id}`, 'true')
      dispatch(
        addToast({
          id: `sage_welcome_${Date.now()}`,
          user: '',
          text: '🌱 Сделай первый ШАГ - начни обмен — твоё дерево Знаний будет расти вместе с тобой! 🚀',
          date: new Date().toISOString(),
          isRead: false,
          link: '/profile',
        })
      )
    }
  }, [user?.id])
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

  const currentUser = useSelector((state: RootState) => state.user.user)
  const filter = useSelector(getFilterState)
  const filteredUsers = useSelector((state: RootState) =>
    filteredUsersSelector(state, currentUser?.id)
  )
  const isFilterActive = useSelector(isFilterActiveSelector)

  const count = PAGE_SIZE * page
  const users = filteredUsers.slice(0, count)
  const hasMore = filteredUsers.length > count

  useEffect(() => {
    setPage(1)
  }, [filteredUsers])

  const loadMore = () => {
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

  const currentUser = useSelector((state: RootState) => state.user.user)
  const popularUsers = useSelector((state: RootState) =>
    popularUsersSelector(state, currentUser?.id)
  )
  const newUsers = useSelector((state: RootState) => newUsersSelector(state, currentUser?.id))
  const recommendedUsers = useSelector((state: RootState) =>
    recommendedUsersSelector(state, currentUser?.id)
  )

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
