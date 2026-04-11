import { checkEmailApi } from '@/services/auth.api'
import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import type { RegisterDataSet } from '@/utils'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { AxiosError } from 'axios'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import styles from './Registration1.module.css'

interface FieldErrors {
  email: boolean
  password: boolean
}

export const Registration1 = ({ data, setData, nextStep }: RegisterDataSet) => {
  const [email, setEmail] = useState<string>(data.email)
  const [password, setPassword] = useState<string>(data.password)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [errors, setErrors] = useState<FieldErrors>({
    email: false,
    password: false,
  })
  const [errorMessage, setErrorMessage] = useState<string>('')

  //Регулярное выражение для email input (вариант приближён к RFC 5322)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const passwordRegex = /^.{8,}$/

  const debouncedCheckEmail = useCallback(
    debounce(async (value: string) => {
      try {
        await checkEmailApi(value)
      } catch (error: unknown) {
        const axiosError = error as AxiosError
        const data = axiosError?.response?.data as { code?: string }
        if (data?.code === 'EMAIL_EXISTS') {
          setErrorMessage('Email уже используется')
          setErrors((prev) => ({ ...prev, email: true }))
        } else if (data?.code === 'EMAIL_REQUIRED') {
          setErrorMessage('Email не введен')
          setErrors((prev) => ({ ...prev, email: true }))
        }
      }
    }, 300),
    []
  )

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value)
      const isInvalidFormat = !emailRegex.test(value)

      setErrors((prev) => ({
        ...prev,
        email: isInvalidFormat, // true, если email НЕвалиден
      }))

      if (isInvalidFormat) {
        setErrorMessage('Введите корректный email')
        return
      }

      // очищаем старую ошибку
      setErrorMessage('')

      // делаем запрос на сервер - проверка занятости емейла
      if (!isInvalidFormat && value !== '') {
        debouncedCheckEmail(value)
      }
    },
    [setErrors, setEmail, emailRegex, debouncedCheckEmail, setErrorMessage]
  )

  const handlePasswordChange = useCallback(
    (value: string) => {
      setErrors((prev) => ({ ...prev, password: !passwordRegex.test(value) })) // true, если пароль НЕвалиден
      setPassword(value)
    },
    [setErrors, setPassword, passwordRegex]
  )

  useEffect(() => {
    setIsVerified(
      !errors.email && !errors.password && email !== '' && password !== '' && errorMessage === ''
    )
  }, [errors.email, errors.password, email, password, errorMessage])

  // Обработчик перехода на следующий шаг
  const handleNextStep = () => {
    setData((prev) => ({ ...prev, email, password }))
    if (isVerified) {
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
                  error={errors.email ? errorMessage : ''}
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
                  disabled={!isVerified}
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
