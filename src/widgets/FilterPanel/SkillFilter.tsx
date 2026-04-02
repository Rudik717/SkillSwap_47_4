import type { AppDispatch } from '@/store'
import { getCategoriesState } from '@/store/categories'
import { getFilterState, setSubcategories } from '@/store/filter'
import { useDispatch, useSelector } from 'react-redux'

import { SkillFilter as SkillFilterUI } from '../SkillFilter/SkillFilter'
import { skillFilterOptions, skillFilterSelectedIds } from './utils'

export const SkillFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { categories, subcategories } = useSelector(getCategoriesState)
  const filter = useSelector(getFilterState)

  if (!categories || !subcategories) {
    return null
  }

  const options = skillFilterOptions({ categories, subcategories })
  const selectedIds = skillFilterSelectedIds({
    selectedSubcategories: filter.subcategories,
    subcategories,
  })

  const onChange = (selectedId: string) => {
    const selectedCategory = categories.find((category) => category.id === selectedId)

    if (selectedCategory) {
      const selectedSubcategories = subcategories.filter(
        ({ id, categoryId }) =>
          filter.subcategories.includes(id) && categoryId === selectedCategory.id
      )
      const allSubcategories = subcategories.filter(
        ({ categoryId }) => categoryId === selectedCategory.id
      )

      const isAlreadySelected = selectedSubcategories.length === allSubcategories.length

      const categorySubcategories = subcategories
        .filter((subcategory) => subcategory.categoryId === selectedId)
        .map((subcategory) => subcategory.id)

      const updatedSubcategories = isAlreadySelected
        ? [...filter.subcategories.filter((id) => !categorySubcategories.includes(id))]
        : [...filter.subcategories, ...categorySubcategories]
      dispatch(setSubcategories([...new Set(updatedSubcategories)]))

      return
    }

    const subcategoryId = selectedId.split('-')?.[1]
    const isAlreadySelected = filter.subcategories.includes(subcategoryId)

    const updatedSubcategories = isAlreadySelected
      ? [...filter.subcategories.filter((id) => id !== subcategoryId)]
      : [...filter.subcategories, ...subcategoryId]
    dispatch(setSubcategories([...new Set(updatedSubcategories)]))
  }

  return <SkillFilterUI options={options} onChange={onChange} selectedIds={selectedIds} />
}
