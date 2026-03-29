import React from 'react'

import { Text } from '../Text/Text'
import styles from './FormInput.module.css'

type Props = {
  id?: string
  label?: string
  error?: string
  info?: string
  children: React.ReactNode
}

export const FormField = ({ id, label, error, info, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}

      <div className={styles.field}>{children}</div>

      {error ? (
        <Text variant="Caption" className={styles.error} as="span">
          {error}
        </Text>
      ) : (
        info && <Text variant="Caption">{info}</Text>
      )}
    </div>
  )
}
