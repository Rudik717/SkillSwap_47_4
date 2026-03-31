import React from 'react'

import { RadioGroup } from '@ui-kit/RadioGroup/RadioGroup'

import styles from './RoleFilter.module.css'

interface RoleFilterProps {
  onChange: (value: string) => void
}

export const RoleFilter: React.FC<RoleFilterProps> = ({ onChange }) => {
  const roleFilterOptions = [
    { label: 'Всё', value: 'Всё' },
    { label: 'Хочу научиться', value: 'Хочу научиться' },
    { label: 'Могу научить', value: 'Могу научить' },
  ]

  return (
    <div className={styles.roleFilter}>
      <RadioGroup name="role-filter" options={roleFilterOptions} onChange={onChange} />
    </div>
  )
}
