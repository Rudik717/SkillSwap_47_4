import React, { useEffect, useState } from 'react'

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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [currentType, setCurrentType] = useState(type)

  // Состояние для управления доступностью поля ввода
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false)

  useEffect(() => {
    setIsPasswordVisible(true)

    if (!icon) {
      setIsInputDisabled(false)
    } else if (icon !== 'eye') {
      setIsInputDisabled(true)
    }
  }, [icon])

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    onChange(inputValue)
  }

  // Обработчик клика по иконке «eye»
  const handleEyeClick = () => {
    const newVisibility = !isPasswordVisible
    setIsPasswordVisible(newVisibility)
    setCurrentType(newVisibility ? 'text' : 'password')

    if (onIconClick) {
      onIconClick()
    }
  }

  const handleIconClick = () => {
    setIsInputDisabled(false)

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
      //Пока не уверена, что календарь тут нужен
      ariaLabel: 'Календарь',
      iconName: 'calendar',
    },
  } as const

  const styleButton = (): string => (disabled ? styles.disabled : '')

  // Рендеринг иконки, если она указана
  const renderIcon = (): React.ReactNode => {
    if (!icon || !iconConfig[icon]) return null

    const { ariaLabel, iconName } = iconConfig[icon]

    return (
      /*TODO: Заменить тег button на компонент Button и перепроверить стили*/
      <button
        type="button"
        disabled={disabled}
        className={`${styles.button} ${styleButton()}`}
        onClick={icon === 'eye' ? handleEyeClick : handleIconClick}
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
          disabled={disabled || isInputDisabled}
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
