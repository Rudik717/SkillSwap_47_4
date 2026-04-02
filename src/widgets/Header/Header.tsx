import { Button, Icon, Logo, MenuButton, SearchInput, Text, UserAvatar } from '@/ui-kit'
import { type FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import styles from './Header.module.css'
import { type THeaderProps } from './type'

export const Header: FC<THeaderProps> = ({ userName, avatarUrl, variant = 'unauth' }) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <header
      className={`${styles.header} ${variant === 'registration' ? styles['header--registration'] : ''}`}
    >
      <div className={styles.container}>
        <Link className={styles.logo} to="/">
          <Logo />
        </Link>
        {variant !== 'registration' && (
          <>
            <nav className={styles.header__nav} aria-label="Основная навигация">
              <Link className={styles.link} to="/about">
                <Text variant="Body">О проекте</Text>
              </Link>
              <MenuButton onPress={() => {}} iconName="arrow-down">
                Все навыки
              </MenuButton>
            </nav>
            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Искать навык"
            ></SearchInput>
          </>
        )}
        {variant === 'unauth' && (
          <>
            <button className={styles.header__button} onClick={() => {}}>
              <Icon name="moon"></Icon>
            </button>
            <div className={styles.header__anauth}>
              <Button variant="secondary" onClick={handleLogin}>
                Войти
              </Button>
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
      </div>
    </header>
  )
}
