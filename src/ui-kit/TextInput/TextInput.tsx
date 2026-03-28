import React from 'react'

import styles from './TextInput.module.css'

interface TextInputProps {
  value?: string
  type?: string // Отдельные типы лоя текста и пароля
  label?: string
  icon?: React.ReactNode
  // info?: string;
  error?: string
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
  onIconClick?: () => void
}

export const TextInput = ({
  value,
  type = 'text',
  label,
  icon,
  //info,
  error,
  maxLength,
  placeholder = '',
  disabled = false,
  onChange,
  onIconClick,
  ...other
}: TextInputProps) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    onChange(inputValue)
  }

  //Сборка всех классов стилей, приходящих из пропсов
  const inputClasses = [styles.input, error ? styles.error : ''].filter(Boolean).join(' ')

  return (
    <div className={styles.container}>
      {label && (
        // Пока оставляем так, но потом нужно будет заменить на компонент Text
        <label className={styles.label}>{label}</label>
      )}
      <div>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={inputClasses}
          onChange={handleChangeInput}
          {...other}
        />
        {icon && (
          <div className={styles.icon} onClick={onIconClick}>
            {icon}
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
