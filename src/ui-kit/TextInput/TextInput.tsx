import React, { useState } from 'react'

import { Icon } from '../Icon/Icon'
import styles from './TextInput.module.css'

interface TextInputProps {
  name: string
  type: string
  value?: string
  label?: string
  icon?: 'eye' | 'edit' | 'calendar'
  info?: string //Подпись под инпутом после ввода, например, если данные валидны
  error?: string //Подпись под данными с ошибками
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
  onIconClick?: () => void
}

export const TextInput = ({
  name,
  value,
  type = 'text',
  label,
  icon,
  info,
  error,
  maxLength,
  placeholder = '',
  disabled = false,
  onChange,
  onIconClick,
  ...other
}: TextInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [currentType, setCurrentType] = useState(type)

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    onChange(inputValue)
  }

  // Обработчик клика по иконке «eye»
  const handleEyeClick = () => {
    const newVisibility = !isPasswordVisible
    setIsPasswordVisible(newVisibility)
    setCurrentType(newVisibility ? 'text' : 'password')

    // Вызываем внешний обработчик, если он передан
    if (onIconClick) {
      onIconClick()
    }
  }

  //Сборка всех классов стилей, приходящих из пропсов
  const inputClasses: string = [
    styles.input,
    disabled ? styles.disabled : '',
    error ? styles.error : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Конфигурация для иконок
  const iconConfig = {
    eye: {
      ariaLabel: isPasswordVisible ? 'Показать пароль' : 'Скрыть пароль',
      iconName: isPasswordVisible ? 'eye' : 'eye-slash',
    },
    edit: {
      ariaLabel: 'Редактировать',
      iconName: 'edit',
    },
    calendar: {
      ariaLabel: 'Календарь',
      iconName: 'calendar',
    },
  } as const

  // Рендеринг иконки, если она указана
  const renderIcon = (): React.ReactNode => {
    if (!icon || !iconConfig[icon]) return null

    const { ariaLabel, iconName } = iconConfig[icon]

    const styleButton = (): string => (disabled ? styles.disabled : '')

    return (
      /*TODO: Заменить тег button на компонент Button и перепроверить стили*/
      <button
        type="button"
        disabled={disabled}
        className={`${styles.button} ${styleButton()}`}
        onClick={icon === 'eye' ? handleEyeClick : onIconClick}
        aria-label={ariaLabel}
      >
        <Icon size={24} name={iconName} />
      </button>
    )
  }

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={`${type}-${name}`}>
          {label}
        </label>
      )}
      <div className={styles.input__container}>
        <input
          type={currentType}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          className={inputClasses}
          onChange={handleChangeInput}
          {...other}
        />
        {renderIcon()}
      </div>
      {/*TODO: Заменить тег span на компонент Text*/}
      {error && <span className={`${styles.span} ${styles.error}`}>{error}</span>}
      {info && <span className={styles.span}>{info}</span>}
    </div>
  )
}
