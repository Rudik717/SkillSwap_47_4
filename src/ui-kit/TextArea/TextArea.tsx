import React, { useEffect, useState } from 'react'

import { Button } from '../Button/Button'
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

  useEffect(() => {
    setIsTextAreaDisabled(true)

    if (!icon) {
      setIsTextAreaDisabled(false)
    } else if (icon !== 'eye') {
      setIsTextAreaDisabled(true)
    }
  }, [icon])

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
  const textareaStyle = { height: icon ? '120px' : 'auto' }
  const styleButton = (): string => (disabled ? styles.disabled : '')

  // Рендеринг иконки, если она указана
  const renderIcon = (): React.ReactNode => {
    if (!icon) return null

    return (
      /*TODO: Заменить тег button на компонент Button и перепроверить стили*/
      <Button
        className={`${styles.button} ${styleButton()}`}
        onClick={handleIconClick}
        aria-label={`Иконка ${icon}`}
        disabled={disabled}
        variant="tertiary"
      >
        <Icon size={24} name={'edit'} />
      </Button>
    )
  }

  return (
    <FormField label={label} error={error} info={info}>
      <div className={styles.textContainer} style={textareaStyle}>
        <textarea
          name={value}
          value={value}
          placeholder={placeholder}
          disabled={disabled || isTextAreaDisabled}
          maxLength={maxLength}
          className={`${textAreaClasses} ${styleButton()}`}
          onChange={handleChange}
          style={textareaStyle}
        />
        {renderIcon()}
      </div>
    </FormField>
  )
}
