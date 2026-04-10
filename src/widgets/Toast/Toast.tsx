import { Icon, Text } from '@/ui-kit'
import type { TToast } from '@/utils'
import { motion } from 'motion/react'
import React, { useEffect, useState } from 'react'

import styles from './Toast.module.css'

interface ToastProps {
  toast: TToast
  onClose: (id: string) => void
  autoHideDuration: number
}

export const Toast = ({ toast, onClose, autoHideDuration }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, autoHideDuration)

    return () => clearTimeout(timer)
  }, [toast.id, autoHideDuration])

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
  }

  const handleExitComplete = () => {
    if (!isVisible) {
      onClose(toast.id)
    }
  }

  return (
    <motion.div
      className={styles.toast}
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onAnimationComplete={!isVisible ? handleExitComplete : undefined}
    >
      <div className={styles.content}>
        <span className={styles.iconWrapper}>
          <Icon name="idea" />
        </span>
        <Text variant="Toast" className={styles.text}>
          {toast.message}
        </Text>
      </div>
      <button className={styles.closeButton} onClick={handleClose}>
        <Icon name="cross" color="rgba(37, 48, 23, 1)" />
      </button>
    </motion.div>
  )
}
