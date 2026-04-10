import { Button, Icon, Text } from '@/ui-kit'

import { Modal } from '../Modal/Modal'
import styles from './RequestSuccess.module.css'

interface RequestSuccessProps {
  onClose: () => void
  onRedirect?: () => void
}

export const RequestSuccess = ({ onClose, onRedirect }: RequestSuccessProps) => {
  const handleClose = () => {
    onClose()
    onRedirect?.()
  }

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <Icon name="bell" size={75} />
        </div>
        <Text variant="H2" className={styles.title}>
          Вы предложили обмен
        </Text>
        <Text variant="Body" className={styles.description}>
          Теперь дождитесь подтверждения. Вам придёт уведомление
        </Text>
        <Button variant="primary" onClick={handleClose} className={styles.button}>
          Готово
        </Button>
      </div>
    </Modal>
  )
}
