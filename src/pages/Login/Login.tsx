import type { AppDispatch, RootState } from '@/store'
import { loginUser } from '@/store/user-slice'
import { Button, Icon, Text, TextInput } from '@/ui-kit'
import { FormLayout } from '@/widgets'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'

import styles from './Login.module.css'

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const location = useLocation()

  //Регулярное выражение для email input (вариант приближён к RFC 5322)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value)
      const isInvalidFormat = !emailRegex.test(value)
      setEmailError(isInvalidFormat)

      if (isInvalidFormat) {
        setErrorMessage('Введите корректный email')
        return
      }

      setErrorMessage('')
    },
    [setEmailError, setEmail, emailRegex, setErrorMessage]
  )

  if (user) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormLayout
        title={<Text variant="H2">Вход</Text>}
        children={
          <>
            <div className={clsx(styles.conteiner, styles.fieldConteiner)}>
              <Button variant="auth" iconLeft="google">
                Продолжить с Google
              </Button>

              <Button variant="auth" iconLeft="apple">
                Продолжить с Apple
              </Button>
            </div>
            <div className={styles.divider}>
              <div className={styles.hr} />
              <Text className={styles.or}>или</Text>
            </div>
            <div className={clsx(styles.conteiner, styles.fieldConteiner)}>
              {error && <Text color="red">{error}</Text>}
              <TextInput
                label="Email"
                name={'email'}
                type={'email'}
                placeholder="Введите email"
                error={emailError ? errorMessage : ''}
                value={email}
                onChange={(value) => handleEmailChange(value)}
              />
              <TextInput
                label="Пароль"
                name={'password'}
                type={'password'}
                placeholder="Введите ваш пароль"
                icon={'eye'}
                onChange={(value) => setPassword(value)}
                value={password}
              />
            </div>
            <div className={clsx(styles.conteiner, styles.buttonConteiner)}>
              <div className={styles.button}>
                <Button disabled={loading}>{loading ? 'Загрузка...' : 'Войти'}</Button>
              </div>
              <Link to="/register" className={styles.register}>
                <Text color="var(--skill-box-text-color)">Зарегистрироваться</Text>
              </Link>
            </div>
          </>
        }
        infoBlock={
          <div className={clsx(styles.conteiner, styles.infoBlock)}>
            <Icon name="light-bubble" size={300} />
            <div className={clsx(styles.conteiner, styles.textConteiner)}>
              <Text variant="H2">С возвращением в SkillSwap!</Text>
              <Text>Обменивайтесь знаниями и навыками с другими людьми</Text>
            </div>
          </div>
        }
      />
    </form>
  )
}
