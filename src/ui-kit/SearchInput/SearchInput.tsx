import { Icon } from '@/ui-kit'
import { useRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import styles from './SearchInput.module.css'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

const SearchInput = ({
  value,
  onChange,
  placeholder = 'Искать навык',
  disabled = false,
  className = '',
  ...props
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const hasValue = value.length > 0

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
        <div className={styles.icon}>
          <Icon name="search" size={24} color="#69735D" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={styles.input}
          {...props}
        />

        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Очистить поиск"
          >
            <Icon name="cross" size={24} />
          </button>
        )}
      </div>
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput
