import { Button, Icon, Text, TextInput } from '@/ui-kit'
import { FormLayout } from '@/widgets'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

import styles from './Login.module.css'

export const Login = () => (
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
          <TextInput
            label="Email"
            name={'email'}
            type={'email'}
            placeholder="Введите email"
            onChange={() => {}}
          />
          <TextInput
            label="Пароль"
            name={'password'}
            type={'password'}
            placeholder="Введите ваш пароль"
            icon={'eye'}
            onChange={() => {}}
          />
        </div>
        <div className={clsx(styles.conteiner, styles.buttonConteiner)}>
          <div className={styles.button}>
            <Button>Войти</Button>
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
)
