import { Button } from '@/ui-kit'

import styles from './FilterChips.module.css'

interface ChipItem {
  id: string
  label: string
  width: string
}

interface FilterChipsProps {
  chips: ChipItem[]
  onRemove: (id: string) => void
}

export const FilterChips = ({ chips, onRemove }: FilterChipsProps) => {
  if (chips.length === 0) return null

  return (
    <div className={styles.container}>
      {chips.map((chip) => (
        <div key={chip.id} className={styles.chipWrapper} style={{ width: chip.width }}>
          <Button variant="tertiary" onClick={() => onRemove(chip.id)}>
            <span className={styles.label}>{chip.label}</span>
            <img src="/src/assets/svg/cross.svg" alt="cross" className={styles.icon} />
          </Button>
        </div>
      ))}
    </div>
  )
}
