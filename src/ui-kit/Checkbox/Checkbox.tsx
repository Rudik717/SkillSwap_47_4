import styles from './Checkbox.module.css'
import CheckboxDone from '/src/assets/svg/checkbox-done.svg?react'
import CheckboxEmpty from '/src/assets/svg/checkbox-empty.svg?react'
import CheckboxRemove from '/src/assets/svg/checkbox-remove.svg?react'

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate'

interface CheckboxProps {
  state?: CheckboxState
  onClick?: () => void
  children: string
  key?: string
}

const icons = {
  unchecked: CheckboxEmpty,
  checked: CheckboxDone,
  indeterminate: CheckboxRemove,
}

export const Checkbox = ({ state = 'unchecked', onClick, children }: CheckboxProps) => {
  const isChecked = state === 'checked'
  const isIndeterminate = state === 'indeterminate'
  const Icon = icons[state]

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={styles.input}
        checked={isChecked}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate // для состояния indeterminate
        }}
        onChange={onClick}
      />
      <Icon className={styles.icon} />
      <span className={styles.text}>{children}</span>
    </label>
  )
}
