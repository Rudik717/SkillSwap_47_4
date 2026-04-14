import { type RootState } from '@/store'
import { Text } from '@/ui-kit'
import { UsersGrid } from '@/widgets'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import styles from './MySkills.module.css'

export const MySkills = () => {
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.user)
  const allUsers = useSelector((state: RootState) => state.users.users)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const currentUser = useMemo(() => {
    if (!user) return null
    return allUsers.find((us) => us.id === user.id)
  }, [allUsers, user])

  return (
    <div className={styles.pageWrapper}>
      <Text variant="H2">Мои навыки</Text>
      {currentUser && <UsersGrid users={[currentUser]} columns={3} />}
    </div>
  )
}
