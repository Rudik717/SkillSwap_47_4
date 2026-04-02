import type { AppDispatch } from '@/store'
import { getFilterState, setGender } from '@/store/filter'
import { RadioGroup } from '@/ui-kit'
import { Text } from '@/ui-kit'
import type { TGender } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'

import styles from './GenderFilter.module.css'

const options = [
  { label: 'Не имеет значения', value: 'any' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
]

export const GenderFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const filter = useSelector(getFilterState)

  const onChange = (selectedValue: string) => {
    dispatch(setGender(selectedValue as TGender))
  }

  return (
    <div className={styles.container}>
      <Text variant="H3" children="Пол автора" className={styles.heading} />

      <RadioGroup
        name="gender-filter"
        options={options}
        onChange={onChange}
        value={filter.gender}
      />
    </div>
  )
}
