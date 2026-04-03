import { Button, Icon, Logo, MenuButton, SearchInput, Text, UserAvatar } from '@/ui-kit'
import { useOutsideClick } from '@/utils'
import { CategoriesMenu } from '@/widgets/CategoriesMenu/CategoriesMenu'
import { type FC, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'
import { type THeaderProps } from './type'

export const Header: FC<THeaderProps> = ({ userName, avatarUrl, variant = 'unauth' }) => {
  // TODO  - получить имя пользователя и флаг авторизации и урл - возможно переделать на получение из стора.
  const [categoriesMenuVisible, setCategoriesMenuVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const allCategoriesRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick({
    ref: allCategoriesRef,
    handler: () => setCategoriesMenuVisible(false),
  })
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
              <div ref={allCategoriesRef}>
                <MenuButton
                  onPress={() => setCategoriesMenuVisible(!categoriesMenuVisible)}
                  iconName="arrow-down"
                  color={`var(--text)`}
                >
                  Все навыки
                </MenuButton>
                <div
                  className={`${styles.categoriesMenu} ${categoriesMenuVisible ? styles.active : ''}`}
                >
                  <CategoriesMenu />
                </div>
              </div>
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
      </div>
    </header>
  )
}
