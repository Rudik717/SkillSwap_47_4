import React, { useState } from 'react'

import { FormField } from '../FormField/FormField'
import { Icon } from '../Icon/Icon'
import styles from './TextArea.module.css'

interface TextAreaProps {
  id?: string
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
  id,
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
  // Состояние для управления доступностью поля ввода
  const [isTextAreaDisabled, setIsTextAreaDisabled] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value
    onChange(newValue)
  }

  const handleIconClick = () => {
    setIsTextAreaDisabled(false)
    if (onIconClick) {
      onIconClick()
    }
  }

  // Сборка классов для textarea
  const textAreaClasses = [styles.textArea, error ? styles.error : ''].filter(Boolean).join(' ')

  const styleButton = (): string => (disabled ? styles.disabled : '')

  // Рендеринг иконки, если она указана
  const renderIcon = (): React.ReactNode => {
    if (!icon) return null

    return (
      /*TODO: Заменить тег button на компонент Button и перепроверить стили*/
      <button
        type="button"
        className={`${styles.button} ${styleButton()}`}
        onClick={handleIconClick}
        aria-label={`Иконка ${icon}`}
        disabled={disabled}
      >
        <Icon size={24} name={'edit'} />
      </button>
    )
  }

  return (
    <FormField label={label} error={error} info={info}>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        disabled={isTextAreaDisabled}
        maxLength={maxLength}
        className={`${textAreaClasses} ${styleButton()}`}
        onChange={handleChange}
      />
      {renderIcon()}
    </FormField>
  )
}
