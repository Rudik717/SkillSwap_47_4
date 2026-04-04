import { Icon } from '@/ui-kit'

import styles from './Toast.module.css'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  if (!isVisible) return null

  return (
    <div className={styles.toast}>
      <div className={styles.content}>
        <span className={styles.iconWrapper}>
          <Icon name="idea" size={24} />
        </span>
        <span className={styles.text}>{message}</span>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <Icon name="cross" size={24} color="rgba(37, 48, 23, 1)" />
      </button>
    </div>
  )
}
