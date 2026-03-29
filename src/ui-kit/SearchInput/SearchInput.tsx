import React, { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

import styles from './SearchInput.module.css'

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string
  value: string
  onChange: (value: string) => void
  error?: string
  info?: string
  placeholder?: string
  disabled?: boolean
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      label,
      value,
      onChange,
      error,
      info,
      placeholder = 'Искать навык',
      disabled = false,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `search-${Math.random().toString(36).slice(2, 11)}`
    const hasError = !!error
    const hasValue = value.length > 0

    const handleClear = () => {
      onChange('')
    }

    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        <div
          className={`${styles.wrapper} ${hasError ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
        >
          <div className={styles.icon}>
            <img src="/search.jpg" alt="Поиск" className={styles.searchImage} />
          </div>

          <input
            ref={ref}
            id={inputId}
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

        {hasError && <div className={styles.errorMessage}>{error}</div>}
        {info && !hasError && <div className={styles.infoMessage}>{info}</div>}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
