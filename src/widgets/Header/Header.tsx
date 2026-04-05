import { useDebounce, useOutsideClick } from '@/hooks'
import type { AppDispatch } from '@/store'
import { setSearch } from '@/store/filter'
import { Button, Icon, Logo, MenuButton, SearchInput, Text, UserAvatar } from '@/ui-kit'
import { CategoriesMenu } from '@/widgets/CategoriesMenu/CategoriesMenu'
import { type FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { UserMenu } from '../UserMenu/UserMenu'
import styles from './Header.module.css'
import { type THeaderProps } from './type'

export const Header: FC<THeaderProps> = ({ userName, avatarUrl, variant = 'unauth' }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isSearchVisible = pathname === '/'

  const [searchValue, setSearchValue] = useState('')
  const [categoriesMenuVisible, setCategoriesMenuVisible] = useState(false)
  const allCategoriesRef = useRef<HTMLDivElement | null>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch<AppDispatch>()

  useOutsideClick({
    ref: allCategoriesRef,
    handler: () => setCategoriesMenuVisible(false),
  })

  const dibouncedSetSearch = useDebounce(() => {
    dispatch(setSearch(searchValue))
  })

  useEffect(() => {
    dibouncedSetSearch()
  }, [dibouncedSetSearch])

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <header
      className={`${styles.header} ${
        variant === 'registration' ? styles['header--registration'] : ''
      }`}
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
                  className={`${styles.categoriesMenu} ${
                    categoriesMenuVisible ? styles.active : ''
                  }`}
                >
                  <CategoriesMenu />
                </div>
              </div>
            </nav>
            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Искать навык"
              className={isSearchVisible ? '' : styles.searchHidden}
            />
          </>
        )}
        {variant === 'unauth' && (
          <>
            <button className={styles.header__button} onClick={() => {}}>
              <Icon name="moon" />
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
                  <Icon name="moon" />
                </button>
                <button className={styles.header__button} onClick={() => {}}>
                  <Icon name="bell" />
                </button>
                <button className={styles.header__button} onClick={() => {}}>
                  <Icon name="like" />
                </button>
              </div>
              <div>
                <div onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} ref={avatarRef}>
                  <UserAvatar name={userName} url={avatarUrl} />
                </div>
                <UserMenu
                  isOpen={isUserMenuOpen}
                  onClose={() => setIsUserMenuOpen(false)}
                  triggerRef={avatarRef}
                  onLogout={() => {
                    // Логика выхода
                  }}
                />
              </div>
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
