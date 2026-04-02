import { Button, Icon, Text } from '@/ui-kit'
import { Modal } from '@/widgets/Modal/Modal'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ExchangeOffer.module.css'

interface ExchangeOfferProps {
  isOpen: boolean
  onClose: () => void
  redirectPath?: string
}

export const ExchangeOffer: React.FC<ExchangeOfferProps> = ({
  isOpen,
  onClose,
  redirectPath = '/skills-details',
}) => {
  const navigate = useNavigate()

  const handleClose = () => {
    onClose()
    navigate(redirectPath)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <Modal onClose={handleClose} paddingTop={40} paddingBottom={40}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <Icon name="bell" size={80} color="#ABD27A" />
        </div>

        <div className={styles.text}>
          <Text variant="H2" className={styles.title}>
            Вы предложили обмен
          </Text>

          <Text variant="Body" className={styles.description}>
            Теперь дождитесь подтверждения. Вам придёт уведомление
          </Text>
        </div>

        <div className={styles.button}>
          <Button variant="primary" onClick={handleClose} className={styles.button}>
            Готово
          </Button>
        </div>
      </div>
    </Modal>
  )
}
