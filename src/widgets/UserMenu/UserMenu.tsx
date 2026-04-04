import { Button, Icon, Text } from '@/ui-kit'
import React, { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { MenuWrapper } from '../MenuWrapper/MenuWrapper'
import styles from './UserMenu.module.css'

interface UserMenuProps {
  isOpen: boolean
  onClose: () => void
  onLogout?: () => void // Опциональный колбэк выхода из аккаунта.
  triggerRef: React.RefObject<HTMLElement | null> // Ссылка на элемент-триггер (кнопку, иконку и т.д.), который открывает меню.
}

export const UserMenu: FC<UserMenuProps> = ({ isOpen, onClose, onLogout, triggerRef }) => {
  const navigate = useNavigate()

  const handleProfileClick = () => {
    onClose()
    navigate('/profile')
  }

  const handleLogoutClick = () => {
    onClose()
    if (onLogout) {
      onLogout()
    }
    navigate('/')
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
