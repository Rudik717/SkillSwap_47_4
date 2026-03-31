import { Button, Icon, Logo, MenuButton, Text, UserAvatar } from '@/ui-kit'
import { type FC } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'
import { type THeaderProps } from './type'

// TODO: добавить SearchInput после завершения компонента

export const Header: FC<THeaderProps> = ({ userName, avatarUrl, variant }) => {
  // TODO  - получить имя пользователя и флаг авторизации и урл - возможно переделать на получение из стора.

  return (
    <header
      className={`${styles.header} ${variant === 'registration' ? styles['header--registration'] : ''}`}
    >
      <Link className={styles.logo} to="/">
        <Logo />
      </Link>
      {variant !== 'registration' && (
        <>
          <nav className={styles.header__nav} aria-label="Основная навигация">
            <Link className={styles.link} to="/about">
              <Text variant="Body">О проекте</Text>
            </Link>
            <MenuButton onPress={() => {}} arrowIcon="arrow-down">
              Все навыки
            </MenuButton>
          </nav>
          {/* на SearchInput поменять */}
          <div className={styles.div}>SearchInput</div>
        </>
      )}
      {variant === 'unauth' && (
        <>
          <button className={styles.header__button} onClick={() => {}}>
            <Icon name="moon"></Icon>
          </button>
          <div className={styles.header__anauth}>
            <Button variant="secondary">Войти</Button>
            <Button variant="primary">Зарегистрироваться</Button>
          </div>
        </>
      )}

      {variant === 'auth' && (
        <>
          <section className={styles.header__auth}>
            <div className={styles.auth__buttons}>
              <button className={styles.header__button} onClick={() => {}}>
                <Icon name="moon"></Icon>
              </button>
              <button className={styles.header__button} onClick={() => {}}>
                <Icon name="bell"></Icon>
              </button>
              <button className={styles.header__button} onClick={() => {}}>
                <Icon name="like"></Icon>
              </button>
            </div>
            <UserAvatar name={userName} url={avatarUrl}></UserAvatar>
          </section>
        </>
      )}
      {variant === 'registration' && (
        <Button variant="tertiary" iconRight="cross">
          Закрыть
        </Button>
      )}
    </header>
  )
}
