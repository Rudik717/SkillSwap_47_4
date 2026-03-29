import styles from './RadioGroup.module.css'

// Задача: создать компонент RadioGroup для выбора одного варианта из списка
// Используется в GenderFilter
interface Option {
  label: string // текст радиокнопки
  value: string // значение, связанное с вариантом
}

interface RadioGroupProps {
  options: Option[] // массив вариантов для выбора
  value: string // текущее выбранное значение
  onChange: (value: string) => void // обработчик изменения выбора
}

export const RadioGroup = ({ options, value, onChange }: RadioGroupProps) => {
  return (
    <div className={styles.group}>
      {options.map((option) => (
        <label key={option.value} className={styles.label}>
          {/* Нативный radio скрыт, стилизован через CSS */}
          <input
            type="radio"
            className={styles.radio}
            name="gender"
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {/* Кастомная стилизация радио-кнопки */}
          <span className={styles.radioCustom}>
            <span className={styles.radioOuter} />
            <span className={styles.radioInner} />
          </span>
          <span className={styles.labelText}>{option.label}</span>
        </label>
      ))}
    </div>
  )
}
