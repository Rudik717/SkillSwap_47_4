import styles from './Button.module.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
  onPress?: () => void
  iconLeft?: string
  iconRight?: string
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  disabled = false,
  onPress,
  iconLeft,
  iconRight,
  children,
}: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} disabled={disabled} onClick={onPress}>
      {iconLeft && <img src={iconLeft} alt="" className={styles.icon} />}
      {children}
      {iconRight && <img src={iconRight} alt="" className={styles.icon} />}
    </button>
  )
}
