import type { TCity, TUser } from '@/utils'
import { ProfileInfo, ProfileMenu } from '@/widgets'
import { menuItems } from '@/widgets/ProfileMenu/ProfileMenu'

import styles from './ProfilePage.module.css'

export const ProfilePage = () => {
  // Заглушка
  const mockCities: TCity[] = [
    { id: '1', name: 'Москва' },
    { id: '2', name: 'Санкт-Петербург' },
    { id: '3', name: 'Новосибирск' },
  ]

  // Заглушка
  const mockUser: TUser = {
    id: '1',
    name: 'Мария',
    email: 'Mariia@gmail.com',
    birthDate: '1995-10-28',
    gender: 'female',
    city: 'Москва',
    about:
      'Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем‑то интересным!',
    avatar:
      'https://images.unsplash.com/photo-1520512202623-51c5c53957df?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    skills: [],
    createdAt: '2023-01-01',
    updatedAt: '2026-01-01',
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.menuWrapper}>
        <ProfileMenu items={menuItems} selectedItem="userData" />
      </div>
      <ProfileInfo cities={mockCities} user={mockUser} />
    </div>
  )
}
