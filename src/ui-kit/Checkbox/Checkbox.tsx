import styles from './Checkbox.module.css'

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate'

interface CheckboxProps {
  state?: CheckboxState
  onClick?: () => void
  children: string
}

const icons = {
  unchecked: '/src/assets/svg/checkbox-empty.svg',
  checked: '/src/assets/svg/checkbox-done.svg',
  indeterminate: '/src/assets/svg/checkbox-remove.svg',
}

export const Checkbox = ({ state = 'unchecked', onClick, children }: CheckboxProps) => {
  const isChecked = state === 'checked'
  const isIndeterminate = state === 'indeterminate'

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
      <img src={icons[state]} alt="" className={styles.icon} />
      <span className={styles.text}>{children}</span>
    </label>
  )
}
