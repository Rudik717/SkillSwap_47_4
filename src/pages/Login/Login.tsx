import type { AppDispatch, RootState } from '@/store'
import { loginUser } from '@/store/user-slice'
import { Button, Icon, Text, TextInput } from '@/ui-kit'
import { FormLayout } from '@/widgets'
import clsx from 'clsx'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useLocation } from 'react-router-dom'

import styles from './Login.module.css'

export const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
  }

  if (user) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate to={from} replace />
  }

  return (
    <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(value) => setEmail(value)}
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
