import type { AppDispatch, RootState } from '@/store'
import { getCategories } from '@/store/categories'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, categories, subcategories } = useSelector(
    ({ categories }: RootState) => categories
  )
  console.log(' *** categories', loading, categories, subcategories)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return <h1>Catalog</h1>
}
