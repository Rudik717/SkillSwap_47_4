import type { AppDispatch } from '@/store'
import { logoutUser } from '@/store/user-slice'
import { Button, Icon, Text } from '@/ui-kit'
import React, { type FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { MenuWrapper } from '../MenuWrapper/MenuWrapper'
import styles from './UserMenu.module.css'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null> // Ссылка на элемент-триггер (кнопку, иконку и т.д.), который открывает меню.
}

export const UserMenu: FC<UserMenuProps> = ({ isOpen, onClose, triggerRef }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const handleProfileClick = () => {
    onClose()
    navigate('/profile')
  }

  const handleLogoutClick = async () => {
    onClose()
    await dispatch(logoutUser())
    navigate('/', { replace: true })
  }

  return (
    <MenuWrapper isOpen={isOpen} onClose={onClose} triggerRef={triggerRef}>
      <div className={styles.userMenu} role="menu" aria-label="Меню пользователя">
        <Button variant="tertiary" className={styles.menuItem} onClick={handleProfileClick}>
          <Text variant="H4">Личный кабинет</Text>
        </Button>
        <Button variant="tertiary" className={styles.menuItem} onClick={handleLogoutClick}>
          <Text variant="H4">Выйти из аккаунта</Text>
          <Icon name="logout" />
        </Button>
      </div>
    </MenuWrapper>
  )
}
