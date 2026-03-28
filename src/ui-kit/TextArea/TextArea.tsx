import React from 'react'

import { Icon } from '../Icon/Icon'
import styles from './TextArea.module.css'

interface TextAreaProps {
  name?: string
  value?: string
  label?: string
  icon?: string
  error?: string
  info?: string
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  onChange: (value: string) => void
  onIconClick?: () => void
}

export const TextArea = ({
  value,
  label,
  icon,
  error,
  info,
  placeholder = '',
  disabled = false,
  maxLength,
  onChange,
  onIconClick,
}: TextAreaProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    onChange(newValue)
  }

  const handleIconClick = () => {
    if (onIconClick) {
      onIconClick()
    }
  }

  // Сборка классов для textarea
  const textAreaClasses = [
    styles.textArea,
    disabled ? styles.disabled : '',
    error ? styles.error : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Рендеринг иконки, если она указана
  const renderIcon = (): React.ReactNode => {
    if (!icon) return null

    return (
      /*TODO: Заменить тег button на компонент Button и перепроверить стили*/
      <button
        type="button"
        className={styles.button}
        onClick={handleIconClick}
        aria-label={`Иконка ${icon}`}
        disabled={disabled}
      >
        <Icon size={24} name={'edit'} />
      </button>
    )
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={`textarea-${label}`}>
          {label}
        </label>
      )}
      <div className={styles.textContainer}>
        <textarea
          id={`textarea-${label}`}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={textAreaClasses}
          onChange={handleChange}
        />
        {renderIcon()}
      </div>
      {error && <span className={`${styles.span} ${styles.error}`}>{error}</span>}
      {info && <span className={styles.span}>{info}</span>}
    </div>
  )
}
