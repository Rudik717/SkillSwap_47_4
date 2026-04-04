import { Button, Icon, Text } from '@/ui-kit'

import { Modal } from '../Modal/Modal'
import styles from './RegistrationSuccess.module.css'

interface RegistrationSuccessProps {
  variant: 'registration' | 'creation'
  onClose: () => void
  onRedirect: () => void // Callback-функция для редиректа после закрытия
}

export const RegistrationSuccess = ({
  variant = 'creation',
  onClose,
  onRedirect,
}: RegistrationSuccessProps) => {
  const handleClose = () => {
    onClose()
    if (onRedirect) {
      onRedirect()
    }
  }

  const iconName = variant === 'registration' ? 'user-circle' : 'done'

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <Icon name={iconName} size={75} />
        </div>
        <Text variant="H2" className={styles.title}>
          Ваше предложение создано
        </Text>
        <Text variant="Body" className={styles.description}>
          Теперь вы можете предложить обмен
        </Text>
        <Button variant="primary" onClick={handleClose} className={styles.button}>
          Готово
        </Button>
      </div>
    </Modal>
  )
}
