import { useRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import searchIcon from '../../assets/svg/search.svg'
import styles from './SearchInput.module.css'

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
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
          <img src={searchIcon} alt="Поиск" className={styles.searchImage} />
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
            <div className={styles.crossIcon}>
              <span className={styles.crossLine}></span>
              <span className={styles.crossLine}></span>
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

SearchInput.displayName = 'SearchInput'

export default SearchInput
