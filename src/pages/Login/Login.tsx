import type { AppDispatch, RootState } from '@/store'
import { clearError, loginUser } from '@/store/user-slice'
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
  const [passwordError, setPasswordError] = useState(false)
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const location = useLocation()

  // RFC 5322
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

  const clearServerError = useCallback(() => {
    if (error) dispatch(clearError())
  }, [error, dispatch])

  const handleEmailChange = useCallback(
    (value: string) => {
      setEmail(value)
      clearServerError()
      // Валидируем в реальном времени только после первого submit
      if (emailTouched) {
        const isInvalidFormat = !emailRegex.test(value)
        setEmailError(isInvalidFormat)
        setEmailMessage(isInvalidFormat ? 'Введите корректный email' : '')
      }
    },
    [clearServerError, emailRegex, emailTouched]
  )

  const handlePasswordChange = useCallback(
    (value: string) => {
      setPassword(value)
      clearServerError()
      if (passwordError) {
        setPasswordError(false)
        setPasswordMessage('')
      }
    },
    [clearServerError, passwordError]
  )

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    let hasError = false

    if (!email || !emailRegex.test(email)) {
      setEmailTouched(true)
      setEmailError(true)
      setEmailMessage('Введите корректный email')
      hasError = true
    }

    if (!password) {
      setPasswordError(true)
      setPasswordMessage('Введите пароль')
      hasError = true
    }

    if (hasError) return

    dispatch(loginUser({ email, password }))
  }

  let emailErrorText: string | undefined = emailError ? emailMessage : undefined
  let passwordErrorText: string | undefined = passwordError ? passwordMessage : undefined

  if (error === 'Email and password are required') {
    passwordErrorText = 'Введите пароль'
  } else if (error === 'Invalid email or password') {
    emailErrorText = 'Неверный email или пароль'
    passwordErrorText = 'Неверный email или пароль'
  }

  if (user) {
    const from = location.state?.from?.pathname ?? '/'
    return <Navigate to={from} replace />
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormLayout
        title={<Text variant="H2">Войти</Text>}
        infoBlock={
          <div className={clsx(styles.conteiner, styles.infoBlock)}>
            <Icon name="light-bubble" size={300} />
            <div className={clsx(styles.conteiner, styles.textConteiner)}>
              <Text variant="H2">Добро пожаловать в SkillSwap!</Text>
              <Text>Войдите, чтобы начать обмениваться навыками</Text>
            </div>
          </div>
        }
      >
        <div className={clsx(styles.conteiner, styles.fieldConteiner)}>
          <Button variant="auth" iconLeft="google">
            Google
          </Button>
          <Button variant="auth" iconLeft="apple">
            Apple
          </Button>
        </div>
        <div className={styles.divider}>
          <div className={styles.hr} />
          <Text className={styles.or}>или</Text>
        </div>
        <div className={clsx(styles.conteiner, styles.fieldConteiner)}>
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Введите ваш email"
            error={emailErrorText}
            value={email}
            onChange={(value) => handleEmailChange(value)}
          />
          <TextInput
            label="Пароль"
            name="password"
            type="password"
            placeholder="Введите ваш пароль"
            icon="eye"
            error={passwordErrorText}
            onChange={(value) => handlePasswordChange(value)}
            value={password}
          />
        </div>
        <div className={clsx(styles.conteiner, styles.buttonConteiner)}>
          <div className={styles.button}>
            <Button className="width-100" disabled={loading}>
              {loading ? '...' : 'Войти'}
            </Button>
          </div>
          <Link to="/register" className={styles.register}>
            <Text color="var(--accent-color)">Зарегистрироваться</Text>
          </Link>
        </div>
      </FormLayout>
    </form>
  )
}
