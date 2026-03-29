import styles from './Checkbox.module.css'

interface CheckboxProps {
  state?: 'unchecked' | 'checked' | 'indeterminate'
  onPress?: () => void
  children: string
}

export const Checkbox = ({ state = 'unchecked', onPress, children }: CheckboxProps) => {
  const isChecked = state === 'checked'
  const isIndeterminate = state === 'indeterminate'

  let statusClass = ''
  if (isChecked) statusClass = styles.checked
  else if (isIndeterminate) statusClass = styles.indeterminate
  else statusClass = styles.unchecked

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        className={styles.input}
        checked={isChecked}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate
        }}
        onChange={onPress}
      />
      <div className={styles.checkbox}>
        <div className={`${styles.inner} ${statusClass}`} />
      </div>
      <span className={styles.text}>{children}</span>
    </label>
  )
}
