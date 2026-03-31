import { Button } from '@/ui-kit'

import styles from './FilterChips.module.css'

interface ChipItem {
  id: string
  label: string
}

interface FilterChipsProps {
  chips: ChipItem[]
  onClick: (id: string) => void
}

export const FilterChips = ({ chips, onClick }: FilterChipsProps) => {
  if (!chips.length) {
    return null
  }

  return (
    <div className={styles.container}>
      {chips.map((chip) => (
        <div key={chip.id} className={styles.chipWrapper}>
          <Button variant="tertiary" iconRight="cross" onClick={() => onClick(chip.id)}>
            {chip.label}
          </Button>
        </div>
      ))}
    </div>
  )
}
