import { type AppDispatch } from '@/store'
import { getFilterState, setRole } from '@/store/filter'
import type { TRole } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'

import { RadioGroup } from '@ui-kit/RadioGroup/RadioGroup'

import styles from './RoleFilter.module.css'

export const RoleFilter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { role } = useSelector(getFilterState)

  const roleFilterOptions = [
    { label: 'Всё', value: 'all' },
    { label: 'Хочу научиться', value: 'learn' },
    { label: 'Могу научить', value: 'teach' },
  ]

  const onChange = (value: string) => {
    dispatch(setRole(value as TRole))
  }

  return (
    <div className={styles.roleFilter}>
      <RadioGroup name="role-filter" options={roleFilterOptions} onChange={onChange} value={role} />
    </div>
  )
}
