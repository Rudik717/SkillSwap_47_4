import type { TCategory, TCity, TSubcategory } from '@/utils'

type SkillFilterOptions = {
  categories: TCategory[]
  subcategories: TSubcategory[]
}

export const skillFilterOptions = ({ categories, subcategories }: SkillFilterOptions) => {
  return categories.map(({ id, name }) => {
    const items = subcategories
      .filter(({ categoryId }) => categoryId === id)
      .map((subcategory) => ({
        id: `${id}-${subcategory.id}`,
        label: subcategory.name,
      }))

    const option = {
      id,
      label: name,
      items,
    }

    return option
  })
}

type SkillFilterSelectedIds = {
  selectedSubcategories: string[]
  subcategories: TSubcategory[]
}

export const skillFilterSelectedIds = ({
  selectedSubcategories,
  subcategories,
}: SkillFilterSelectedIds) => {
  const selectedSubcategoriesIds = subcategories
    .filter(({ id }) => selectedSubcategories.includes(id))
    .map(({ id, categoryId }) => `${categoryId}-${id}`)

  const selectedIds = [...selectedSubcategoriesIds]

  return [...new Set(selectedIds)] // remove duplicates
}

export const cityFilterOptions = (cities: TCity[]) => {
  return cities.map(({ id, name }) => ({
    value: id,
    label: name,
  }))
}
