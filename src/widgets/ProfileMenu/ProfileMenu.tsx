import { Button, Text } from '@/ui-kit'
import { NavLink } from 'react-router-dom'

import styles from './ProfileMenu.module.css'

export type IconName = 'request' | 'message' | 'like' | 'idea' | 'user'

export interface ProfileMenuElement {
  id: string
  label: string
  icon: IconName
  path: string // Путь для навигации
}

interface ProfileMenuProps {
  items: ProfileMenuElement[]
  selectedItem: string
}

export const menuItems: ProfileMenuElement[] = [
  {
    id: 'request',
    label: 'Заявки',
    icon: 'request',
    path: '',
  },
  {
    id: 'message',
    label: 'Мои обмены',
    icon: 'message',
    path: '',
  },
  {
    id: 'like',
    label: 'Избранное',
    icon: 'like',
    path: '/profile/favorites',
  },
  {
    id: 'idea',
    label: 'Мои навыки',
    icon: 'idea',
    path: '/profile/myskills',
  },
  {
    id: 'userData',
    label: 'Личные данные',
    icon: 'user',
    path: '/profile', // Активный путь
  },
]

export const ProfileMenu = ({ items, selectedItem }: ProfileMenuProps) => {
  return (
    <nav className={styles.container}>
      <ul className={styles.itemsList}>
        {items.map((item) => {
          const isActiveLink = !!item.path //Есть путь - значит активная ссылка
          const isSelected = item.id === selectedItem

          const renderMenuItem = () => {
            if (isActiveLink) {
              return (
                <NavLink to={item.path} className={styles.link}>
                  <Button
                    className={`
                      ${styles.sidebarButton} 
                      ${isSelected ? styles.sidebarButton_active : styles.disabled}`}
                    aria-label={item.label}
                    iconLeft={item.icon}
                  >
                    <Text variant="Body">{item.label}</Text>
                  </Button>
                </NavLink>
              )
            } else {
              // Для заглушек используем кнопку с отключённым состоянием
              return (
                <Button
                  className={`${styles.sidebarButton} ${styles.disabled}`}
                  aria-label={`${item.label} (в разработке)`}
                  iconLeft={item.icon}
                >
                  <Text variant="Body">{item.label}</Text>
                </Button>
              )
            }
          }
          return (
            <li key={item.id} className={styles.item}>
              {renderMenuItem()}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
