import type { AppDispatch, RootState } from '@/store'
import { getUsers } from '@/store/users'
import { Button, Text } from '@/ui-kit'
import { ExchangeOffer, UserCard, UserGallery } from '@/widgets'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import styles from './SkillPage.module.css'

export const SkillPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { users, loading } = useSelector((state: RootState) => state.users)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers())
    }
  }, [dispatch, users.length])

  if (loading) return <div>Загрузка...</div>

  const user = users.find((u) => u.id === id)
  if (!user) return <Navigate to="/404" />

  const teachSkills = user.skills.filter((s) => s.type === 'teach')
  const otherTeachSkills = teachSkills.slice(1)
  const detailedSkill = teachSkills[0]
  const similarUsers = users.filter((u) => u.id !== id).slice(0, 4)
  const galleryImages = user.skills.flatMap((s) => s.images || [])

  const cleanDescription = detailedSkill?.description?.replace(/Подробнее/g, '').trim()

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.userColumn}>
          <UserCard user={user} />
        </div>
        <div className={styles.rightBlock}>
          {detailedSkill && (
            <div className={styles.detailColumn}>
              <div className={styles.detailContent}>
                <Text variant="H3">{detailedSkill.title}</Text>
                <Text variant="Caption">
                  {detailedSkill.category} / {detailedSkill.subcategory}
                </Text>
                {cleanDescription && (
                  <Text variant="Body" className={styles.description}>
                    {cleanDescription}
                  </Text>
                )}
              </div>
              <div className={styles.detailButton}>
                <Button onClick={() => setIsModalOpen(true)}>Предложить обмен</Button>
              </div>
            </div>
          )}
          <div className={styles.galleryColumn}>
            <UserGallery images={galleryImages} />
          </div>
        </div>
      </div>

      {otherTeachSkills.length > 0 && (
        <div className={styles.section}>
          <Text variant="H3">Может научить</Text>
          <div className={styles.skillsList}>
            {otherTeachSkills.map((skill) => (
              <Text key={skill.id} variant="Body" className={styles.skillItem}>
                {skill.title}
              </Text>
            ))}
          </div>
        </div>
      )}

      {similarUsers.length > 0 && (
        <div className={styles.section}>
          <Text variant="H3">Похожие предложения</Text>
          <div className={styles.usersGrid}>
            {similarUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}

      <ExchangeOffer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
