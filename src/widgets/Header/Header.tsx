import { useDebounce, useOutsideClick } from '@/hooks'
import type { AppDispatch, RootState } from '@/store'
import { setSearch } from '@/store/filter'
import {
  fetchNotifications,
  removeToast,
  selectActiveToasts,
  selectHasUnread,
} from '@/store/notifications'
import { Button, Icon, IconBadge, Logo, MenuButton, SearchInput, Text, UserAvatar } from '@/ui-kit'
import { CategoriesMenu } from '@/widgets/CategoriesMenu/CategoriesMenu'
import { type FC, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { NotificationsMenu } from '../NotificationsMenu/NotificationsMenu'
import { ToastContainer } from '../ToastContainer/ToastContainer'
import { UserMenu } from '../UserMenu/UserMenu'
import styles from './Header.module.css'
import { type THeaderProps } from './type'

export const Header: FC<THeaderProps> = ({ variant = 'unauth' }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isSearchVisible = pathname === '/'

  const [searchValue, setSearchValue] = useState('')
  const [categoriesMenuVisible, setCategoriesMenuVisible] = useState(false)
  const allCategoriesRef = useRef<HTMLDivElement | null>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const notificationsButtonRef = useRef<HTMLButtonElement>(null)

  const hasUnread = useSelector(selectHasUnread)
  const { user } = useSelector((state: RootState) => state.user)
  const activeToasts = useSelector(selectActiveToasts)
  const hasFetchedRef = useRef(false)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (variant === 'auth' && user?.id && !hasFetchedRef.current) {
      dispatch(fetchNotifications(user.id))
      hasFetchedRef.current = true
    }
  }, [dispatch, user?.id, variant])

  const handleCloseToast = (toastId: string) => {
    dispatch(removeToast(toastId))
  }

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

  const handleRegister = () => {
    navigate('/register')
  }

  return (
    <>
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
                <Button variant="primary" onClick={handleRegister}>
                  Зарегистрироваться
                </Button>
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
                  <div className={styles.notification__button_container}>
                    <button
                      className={styles.header__button}
                      onClick={() => setIsNotificationsMenuOpen(!isNotificationsMenuOpen)}
                      ref={notificationsButtonRef}
                    >
                      <IconBadge isVisible={hasUnread}>
                        <Icon name="bell" />
                      </IconBadge>
                    </button>
                    <NotificationsMenu
                      isOpen={isNotificationsMenuOpen}
                      onClose={() => setIsNotificationsMenuOpen(false)}
                      triggerRef={notificationsButtonRef}
                    />
                  </div>

                  <button
                    className={styles.header__button}
                    onClick={() => navigate('/profile/favorites')}
                  >
                    <Icon name="like" />
                  </button>
                </div>
                <div>
                  <div
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    ref={avatarRef}
                    aria-label="Меню пользователя"
                    aria-expanded={isUserMenuOpen}
                  >
                    <UserAvatar />
                  </div>
                  <UserMenu
                    isOpen={isUserMenuOpen}
                    onClose={() => setIsUserMenuOpen(false)}
                    triggerRef={avatarRef}
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
      <ToastContainer toasts={activeToasts} onClose={handleCloseToast} autoHideDuration={5000} />
    </>
  )
}
