import type { RootState } from '@/store'
import { ProfileInfo, ProfileMenu } from '@/widgets'
import { menuItems } from '@/widgets/ProfileMenu/ProfileMenu'
import { useSelector } from 'react-redux'

import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const cities = useSelector((state: RootState) => state.cities.cities)
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.menuWrapper}>
        <ProfileMenu items={menuItems} selectedItem="userData" />
      </div>
      <ProfileInfo cities={cities} user={user} />
    </div>
  )
}
