import styles from './Badge.module.css'

export type BadgeProps = {
  label: string
  backgroundColor: string
}

export const Badge = ({ label, backgroundColor }: BadgeProps) => {
  return (
    <div className={styles.badge} style={{ background: backgroundColor }}>
      {label}
    </div>
  )
}
