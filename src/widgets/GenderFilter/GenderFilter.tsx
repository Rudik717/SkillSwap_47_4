import { RadioGroup } from '@/ui-kit'

import styles from './GenderFilter.module.css'

interface GenderFilterProps {
  options: { label: string; value: string }[]
  name?: string
  onChange: (value: string) => void
}

export const GenderFilter = ({ options, name = 'gender', onChange }: GenderFilterProps) => {
  return (
    <div className={styles.filter}>
      <RadioGroup name={name} options={options} onChange={onChange} />
    </div>
  )
}
