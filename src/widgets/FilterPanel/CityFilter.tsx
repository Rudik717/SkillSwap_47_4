import type { AppDispatch } from '@/store'
import { getCitiesState } from '@/store/cities'
import { getFilterState, setCities } from '@/store/filter'
import { useDispatch, useSelector } from 'react-redux'

import { CityFilter as CityFilterUI } from '../CityFilter/CityFilter'
import { cityFilterOptions } from './utils'

export const CityFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector(getFilterState)
  const { cities } = useSelector(getCitiesState)

  const options = cityFilterOptions(cities)

  const onClick = (selectedValue: string) => {
    const isAlreadyChecked = filter.cities.includes(selectedValue)
    const citiesFilter = isAlreadyChecked
      ? filter.cities.filter((id) => id !== selectedValue)
      : [...filter.cities, selectedValue]
    dispatch(setCities(citiesFilter))
  }

  return <CityFilterUI options={options} selectedValues={filter.cities} onClick={onClick} />
}
