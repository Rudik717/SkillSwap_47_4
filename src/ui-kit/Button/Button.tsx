import { Icon } from '@/ui-kit'
import type { ComponentProps, ReactNode } from 'react'

import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  onClick?: () => void
  iconLeft?: ComponentProps<typeof Icon>['name'] // тип — название иконки из Icon
  iconRight?: ComponentProps<typeof Icon>['name'] // тип — название иконки из Icon
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  disabled = false,
  onClick,
  iconLeft,
  iconRight,
  children,
}: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} disabled={disabled} onClick={onClick}>
      {iconLeft && <Icon name={iconLeft} size={24} />}
      {children}
      {iconRight && <Icon name={iconRight} size={24} />}
    </button>
  )
}
