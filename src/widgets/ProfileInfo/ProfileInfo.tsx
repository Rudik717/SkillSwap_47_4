import { getAllCities } from '@/store/cities'
import { Avatar, Button, DateInput, Icon, Select, Text, TextArea, TextInput } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import type { TCity, TUser } from '@/utils'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './ProfileInfo.module.css'

interface ProfileInfoProps {
  cities?: TCity[]
  user?: TUser | null
}

export const ProfileInfo = ({ cities: citiesProp, user }: ProfileInfoProps) => {
  // Получаем список городов
  const allCities = useSelector(getAllCities)
  const cities = citiesProp ?? allCities

  const cityOptions: Option[] = cities.map((c) => ({ label: c.name, value: c.id }))

  // Опции для селекта выбора пола
  const genderOptions: Option[] = [
    { label: 'Не указан', value: 'unspecified' },
    { label: 'Мужской', value: 'male' },
    { label: 'Женский', value: 'female' },
  ]

  // Состояния формы
  const [email, setEmail] = useState(user?.email ?? '')
  const [name, setName] = useState(user?.name ?? '')
  const [birthDate, setBirthDate] = useState<Date | null>(
    user?.birthDate ? new Date(user.birthDate) : null
  )
  const [gender, setGender] = useState(user?.gender ?? '')
  const [city, setCity] = useState<string>('')
  const [about, setAbout] = useState(user?.about ?? '')
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatar)

  // Флаг изменений в форме
  const [isEdited, setIsEdited] = useState(false)

  // При загрузке устанавливаем id города
  useEffect(() => {
    if (!user?.city || cities.length === 0) return

    const found = cities.find((c) => c.name === user.city)

    if (found) setCity(found.id)
  }, [user?.city, cities])

  // Аватар: выбор файла
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarUrl(url)
      setIsEdited(true)
    }
  }

  // Заглушка для сохранения формы
  const handleSave = () => {
    console.log('Сохраняем данные профиля:', {
      email,
      name,
      birthDate,
      gender,
      city,
      about,
      avatarUrl,
    })
    setIsEdited(false)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <div className={styles.field}>
          <TextInput
            label="Почта"
            type="text"
            name="email"
            value={email}
            onChange={(val) => {
              setEmail(val)
              setIsEdited(true)
            }}
            icon="edit"
          />

          <Text className={styles.changePassword}>Изменить пароль</Text>
        </div>

        <div className={styles.field}>
          <TextInput
            label="Имя"
            type="text"
            name="name"
            value={name}
            onChange={(val) => {
              setName(val)
              setIsEdited(true)
            }}
            icon="edit"
          />
        </div>

        <div className={styles.rowFields}>
          <div className={styles.field}>
            <DateInput
              label="Дата рождения"
              value={birthDate}
              onChange={(date) => {
                setBirthDate(date)
                setIsEdited(true)
              }}
            />
          </div>

          <div className={styles.field}>
            <Select
              label="Пол"
              value={genderOptions.find((o) => o.value === gender) || null}
              onChange={(option) => {
                setGender(!option || Array.isArray(option) ? '' : option.value)
                setIsEdited(true)
              }}
              options={genderOptions}
            />
          </div>
        </div>

        <div className={styles.field}>
          <Select
            label="Город"
            value={cityOptions.find((o) => o.value === city) || null}
            options={cityOptions}
            onChange={(option) => {
              setCity(!option || Array.isArray(option) ? '' : option.value)
              setIsEdited(true)
            }}
          />
        </div>

        <div className={styles.field}>
          <TextArea
            label="О себе"
            name="about"
            value={about}
            onChange={(val) => {
              setAbout(val)
              setIsEdited(true)
            }}
            icon="edit"
          />
        </div>

        <Button onClick={handleSave} disabled={!isEdited}>
          Сохранить
        </Button>
      </div>

      <div className={styles.avatarContainer}>
        <Avatar url={avatarUrl} size={244} />
        <div className={styles.avatarEditButton} onClick={handleAvatarClick}>
          <Icon name="gallery-edit" size={24} color="#253017" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleAvatarChange}
        />
      </div>
    </div>
  )
}
