import type { RootState } from '@/store'
import { ProfileMenu } from '@/widgets'
import { menuItems } from '@/widgets/ProfileMenu/ProfileMenu'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'

import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const cities = useSelector((state: RootState) => state.cities.cities)
  const location = useLocation()

  // Определяем активный пункт меню на основе текущего пути
  const getSelectedItem = () => {
    const pathname = location.pathname
    if (pathname.endsWith('/favorites')) return 'like'
    if (pathname === '/profile') return 'userData'
    return 'userData' // значение по умолчанию
  }

  const selectedItem = getSelectedItem()

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.menuWrapper}>
        <ProfileMenu items={menuItems} selectedItem={selectedItem} />
      </div>
      <Outlet context={{ user, cities }} />
    </div>
  )
}
