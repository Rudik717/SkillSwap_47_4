import React, { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
import { FormField } from '../FormField/FormField'
import styles from './TextInput.module.css'

interface TextInputProps {
  id?: string
  name: string
  type: string
  value?: string
  label?: string
  icon?: 'eye' | 'edit' | 'calendar'
  info?: string
  error?: string
  maxLength?: number
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
  onIconClick?: () => void
}

export const TextInput = ({
  id,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(true)
  const [currentType, setCurrentType] = useState<string>(type)

  // Состояние для управления доступностью поля ввода
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false)

  useEffect(() => {
    setIsPasswordVisible(false)

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
      <Button
        disabled={disabled}
        variant="tertiary"
        iconLeft={iconName}
        className={`${styles.button} ${styleButton()}`}
        onClick={icon === 'eye' ? handleEyeClick : handleIconClick}
        aria-label={ariaLabel}
      ></Button>
    )
  }

  return (
    <FormField label={label} error={error} info={info}>
      <div className={styles.input__container}>
        <input
          type={currentType}
          name={name}
          id={id}
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
    </FormField>
  )
}
