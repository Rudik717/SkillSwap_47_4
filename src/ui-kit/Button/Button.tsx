import { Icon } from '@/ui-kit'

import styles from './Button.module.css'

// импорт компонента Icon

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  onClick?: () => void
  iconLeft?: React.ComponentProps<typeof Icon>['name'] // тип — название иконки из Icon
  iconRight?: React.ComponentProps<typeof Icon>['name'] // тип — название иконки из Icon
  children: React.ReactNode
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
