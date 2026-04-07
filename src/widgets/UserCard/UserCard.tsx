import { getAllCategories } from '@/store/categories'
import { Avatar, Badge, Button, Icon, Text } from '@/ui-kit'
import { type FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './UserCard.module.css'
import type { TUserCardProps } from './type'

export const UserCard: FC<TUserCardProps> = memo(({ user, hideActions, showAbout }) => {
  const { name, city = '', birthDate = '', avatar = '', skills } = user
  const teachSkills = skills.filter((skill) => skill.type === 'teach')
  const learnSkills = skills.filter((skill) => skill.type === 'learn')
  const categories = useSelector(getAllCategories)

  const MAX_VISIBLE = 1
  const textColor = 'var(--text)'

  const displayedTeachSkills = teachSkills.slice(0, MAX_VISIBLE)
  const remainingTeachCount = teachSkills.length - MAX_VISIBLE
  const displayedLearnSkills = learnSkills.slice(0, MAX_VISIBLE)
  const remainingLearnCount = learnSkills.length - MAX_VISIBLE

  const [like, setLike] = useState<boolean>(false)

  const toggleLike = () => {
    setLike(!like)
  }

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return null
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const hasHadBirthday =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())

    if (!hasHadBirthday) age--
    return age
  }

  const getAgeText = (birthDate?: string) => {
    const age = calculateAge(birthDate)
    if (age === null) return ''

    const lastDigit = age % 10
    const lastTwoDigits = age % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${age} лет`
    }
    if (lastDigit === 1) {
      return `${age} год`
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return `${age} года`
    }
    return `${age} лет`
  }

  const getBadgeColor = (categoryId: string) => {
    const category = categories.find((category) => category.id === categoryId)
    return category?.color || '#F5F5F5'
  }

  return (
    <article className={styles['user-card']}>
      <div className={styles['user-card__header']}>
        <Avatar url={avatar} alt={`Аватар ${name}`}></Avatar>
        <div className={styles['user-card__info']}>
          <div
            className={`${styles['user-card__like-button-wrapper']} ${
              hideActions ? styles.hidden : ''
            }`}
          >
            <button className={styles['user-card__like-button']} onClick={toggleLike}>
              <Icon name={like ? 'like-filled' : 'like'} color={textColor} />
            </button>
          </div>
          <div className={styles['user-card__info_title']}>
            <Text variant="H3" style={{ fontWeight: 600, color: textColor }}>
              {name}
            </Text>
            <Text
              variant="Caption"
              style={{ color: textColor }}
            >{`${city}, ${getAgeText(birthDate)}`}</Text>
          </div>
        </div>
      </div>
      {showAbout && user.about && (
        <div className={styles['user-card__about-wrapper']}>
          <Text variant="Body" className={styles['user-card__about']}>
            {user.about}
          </Text>
        </div>
      )}
      <section className={styles['user-card__body']}>
        <div className={styles['body-skills']}>
          <div className={styles['body-skills_section']}>
            <Text variant="H4" style={{ color: textColor }}>
              Может научить:
            </Text>
            <div className={styles['body-skills_section_buttons']}>
              {displayedTeachSkills.map((skill) => (
                <Badge
                  key={skill.id}
                  label={skill.title}
                  backgroundColor={getBadgeColor(skill.category)}
                ></Badge>
              ))}
              {remainingTeachCount > 0 && (
                <div className={styles['badge-counter']}>+{remainingTeachCount}</div>
              )}
            </div>
          </div>
          <div className={styles['body-skills_section']}>
            <Text variant="H4" style={{ color: textColor }}>
              Хочет научиться:
            </Text>
            <div className={styles['body-skills_section_buttons']}>
              {displayedLearnSkills.map((skill) => (
                <Badge
                  key={skill.id}
                  label={skill.title}
                  backgroundColor={getBadgeColor(skill.category)}
                ></Badge>
              ))}
              {remainingLearnCount > 0 && (
                <div className={styles['badge-counter']}>+{remainingLearnCount}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {!hideActions && (
        <Button variant="primary" className={styles['user-card__details-button']}>
          Подробнее
        </Button>
      )}
    </article>
  )
})
