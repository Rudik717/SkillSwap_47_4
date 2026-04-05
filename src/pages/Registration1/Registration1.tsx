import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import type { RegisterDataSet } from '@/utils'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { useCallback, useState } from 'react'

import styles from './Registration1.module.css'

export const Registration1 = ({ data, setData, nextStep }: RegisterDataSet) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState(data.password)
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })

  const handleEmailChange = useCallback(
    (value: string) => {
      setErrors((prev) => ({
        ...prev,
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      }))
      setEmail(value)
    },
    [setData]
  )

  const handlePasswordChange = useCallback(
    (value: string) => {
      setErrors((prev) => ({ ...prev, password: !/^.{8,}$/.test(value) }))
      setPassword(value)
    },
    [setData]
  )

  // Определяем, можно ли перейти на следующий шаг
  const isNextStepEnabled = !errors.email && !errors.password && email !== '' && password !== ''

  // Обработчик перехода на следующий шаг
  const handleNextStep = () => {
    if (isNextStepEnabled) {
      nextStep()
    }
  }

  return (
    <>
      <Stepper currentStep={1} />
      <FormLayout
        children={
          <>
            <div className={styles.container}>
              <div className={styles.buttonContainer}>
                <Button variant="secondary" children="Продолжить с Google" iconLeft="google" />
                <Button variant="secondary" children="Продолжить с Apple" iconLeft="apple" />
              </div>
              <div className={styles.textDivider}>
                <Text variant="Body" as="span">
                  или
                </Text>
              </div>
              <div className={styles.form}>
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Введите email"
                  error={errors.email ? 'Введите корректный email' : ''}
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextInput
                  name="password"
                  type="password"
                  label="Пароль"
                  placeholder="Придумайте надежный пароль"
                  error={errors.password ? 'Пароль должен содержать не менее 8 знаков' : ''}
                  icon="eye"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="primary"
                  children="Далее"
                  className={styles.buttonSubmit}
                  onClick={handleNextStep}
                  disabled={!isNextStepEnabled}
                />
              </div>
            </div>
          </>
        }
        infoBlock={
          <>
            <div className={styles.infoBlock}>
              <Icon name="light-bubble" size={300} />
              <div className={styles.textBlock}>
                <Text variant="H2" className={styles.header}>
                  Добро пожаловать в SkillSwap!
                </Text>
                <Text variant="Body" className={styles.textAlign}>
                  Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
                </Text>
              </div>
            </div>
          </>
        }
      />
    </>
  )
}
