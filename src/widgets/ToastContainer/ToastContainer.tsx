import type { TToast } from '@/utils'
import { AnimatePresence } from 'motion/react'

import { Toast } from '../Toast/Toast'
import styles from './ToastContainer.module.css'

interface ToastContainerProps {
  toasts: TToast[]
  onClose: (toastId: string) => void
  autoHideDuration?: number
}

export const ToastContainer = ({
  toasts,
  onClose,
  autoHideDuration = 5000,
}: ToastContainerProps) => {
  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onClose={onClose}
            autoHideDuration={autoHideDuration}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
