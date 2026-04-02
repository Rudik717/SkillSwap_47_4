import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch } from '../../store'
import { getAllSubcategories } from '../../store/categories'
import { getAllCities } from '../../store/cities'
import { getFilterState, setCities, setGender, setRole, setSubcategories } from '../../store/filter'
import type { TCity, TGender, TRole, TSubcategory } from '../../utils'
import { FilterChips } from '../FilterChips/FilterChips'

type TChip = {
  id: string
  label: string
}

export const ActiveFilterChips = () => {
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector(getFilterState)
  const allCities = useSelector(getAllCities)
  const allSubcategories = useSelector(getAllSubcategories)

  const roleLabels: Record<Exclude<TRole, 'all'>, string> = {
    teach: 'Могу научить',
    learn: 'Хочу научиться',
  }

  const genderLabels: Record<Exclude<TGender, 'any'>, string> = {
    male: 'Мужчины',
    female: 'Женщины',
  }

  const chips: TChip[] = [
    ...(filter.role !== 'all' ? [{ id: 'role', label: roleLabels[filter.role] }] : []),
    ...(filter.gender !== 'any' ? [{ id: 'gender', label: genderLabels[filter.gender] }] : []),
    ...filter.cities.map((cityId: TCity['id']) => ({
      id: `city__${cityId}`,
      label: allCities.find((city: TCity) => city.id === cityId)?.name ?? cityId,
    })),
    ...filter.subcategories.map((subcategoryId: string) => ({
      id: `sub__${subcategoryId}`,
      label:
        allSubcategories.find(
          (subcategory: TSubcategory) => String(subcategory.id) === subcategoryId
        )?.name ?? subcategoryId,
    })),
  ]

  const handleRemove = (chipId: string) => {
    if (chipId === 'role') {
      dispatch(setRole('all'))
      return
    }

    if (chipId === 'gender') {
      dispatch(setGender('any'))
      return
    }

    if (chipId.startsWith('city__')) {
      const cityId = chipId.replace('city__', '')
      dispatch(setCities(filter.cities.filter((id: string) => id !== cityId)))
      return
    }

    if (chipId.startsWith('sub__')) {
      const subcategoryId = chipId.replace('sub__', '')
      dispatch(setSubcategories(filter.subcategories.filter((id: string) => id !== subcategoryId)))
    }
  }

  return <FilterChips chips={chips} onClick={handleRemove} />
}
