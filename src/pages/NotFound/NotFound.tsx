import error_404 from '@/assets/svg/error 404.svg'
import { Button, Text } from '@/ui-kit'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './NotFound.module.css'

export const NotFound: FC = () => {
  const navigate = useNavigate()

  const handleClickButton = () => {
    navigate('/')
  }

  return (
    <main className={styles.main}>
      <img src={error_404} alt="Страница не найдена" />
      <div className={styles.containerWrap}>
        <div className={styles.textWrap}>
          <h2 className={styles.errorTitle}>Страница не найдена</h2>
          <Text>
            К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже
          </Text>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonWidth}>
            <Button variant="secondary" onClick={handleClickButton}>
              <span>Сообщить об ошибке</span>
            </Button>
          </div>
          <div className={styles.buttonWidth}>
            <Button variant="primary" onClick={handleClickButton}>
              <span>На главную</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
