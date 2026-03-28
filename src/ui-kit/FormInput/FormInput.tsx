import React from 'react'

import styles from './FormInput.module.css'

type FormInputProps = {
  label?: string
  error?: string
  info?: string
  children: React.ReactNode
}

export const FormInput = ({ label, error, info, children }: FormInputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.field}>{children}</div>

      {error ? (
        <span className={styles.error}>{error}</span>
      ) : (
        info && <span className={styles.info}>{info}</span>
      )}
    </div>
  )
}
