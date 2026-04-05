import clsx from 'clsx'
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
  className?: string
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
  className,
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

  const buttonIconClass = clsx(styles.button, disabled && styles.disabled)
  const textareaClass = clsx(
    styles.textArea,
    error && styles.error,
    disabled && styles.disabled,
    className
  )
  const textareaStyle = { height: icon ? '120px' : '95px' }

  const renderIcon = (): React.ReactNode => {
    if (!icon) return null

    return (
      <Button
        className={buttonIconClass}
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
          className={textareaClass}
          onChange={handleChange}
          style={textareaStyle}
        />
        {renderIcon()}
      </div>
    </FormField>
  )
}
