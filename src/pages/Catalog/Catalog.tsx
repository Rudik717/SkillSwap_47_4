import type { AppDispatch, RootState } from '@/store'
import { getCategories } from '@/store/categories'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Catalog.module.css'

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, categories, subcategories } = useSelector(
    ({ categories }: RootState) => categories
  )
  console.log(' *** categories', loading, categories, subcategories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <main className={styles.main}>
      <h1>Catalog</h1>
    </main>
  )
}
