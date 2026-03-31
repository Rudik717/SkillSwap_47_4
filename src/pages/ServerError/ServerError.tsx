import error_500 from '@/assets/svg/error 500.svg'
import { Button, Text } from '@/ui-kit'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ServerError.module.css'

export const ServerError: FC = () => {
  const navigate = useNavigate()

  const handleClickButton = () => {
    navigate('/')
  }

  return (
    <main className={styles.main}>
      <img src={error_500} alt="На сервере произошла ошибка" />
      <div className={styles.containerWrap}>
        <div className={styles.textWrap}>
          <h2 className={styles.errorTitle}>На сервере произошла ошибка</h2>
          <Text>Попробуйте позже или вернитесь на главную страницу</Text>
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
