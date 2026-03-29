import styles from './Checkbox.module.css'

// Задача: создать компонент Checkbox с тремя состояниями
// Вместо псевдоэлементов используем реальные SVG-иконки из Figma

interface CheckboxProps {
  state?: 'unchecked' | 'checked' | 'indeterminate' // три состояния чекбокса
  onPress?: () => void // обработчик нажатия
  children: string // текст чекбокса
}

export const Checkbox = ({ state = 'unchecked', onPress, children }: CheckboxProps) => {
  const isChecked = state === 'checked'
  const isIndeterminate = state === 'indeterminate'

  // В зависимости от состояния подставляем нужную SVG-иконку
  let iconSrc = ''
  if (isChecked)
    iconSrc = '/src/assets/svg/checkbox-done.svg' // галочка
  else if (isIndeterminate)
    iconSrc = '/src/assets/svg/checkbox-remove.svg' // минус
  else iconSrc = '/src/assets/svg/checkbox-empty.svg' // пустой квадрат

  return (
    <label className={styles.label}>
      {/* Нативный чекбокс скрыт, нужен только для состояния и onChange */}
      <input
        type="checkbox"
        className={styles.input}
        checked={isChecked}
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate // для состояния indeterminate
        }}
        onChange={onPress}
      />
      {/* Кастомная иконка чекбокса */}
      <img src={iconSrc} alt="" className={styles.icon} />
      {/* Текст чекбокса */}
      <span className={styles.text}>{children}</span>
    </label>
  )
}
