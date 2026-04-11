import type { AppDispatch } from '@/store'
import type { RootState } from '@/store'
import { addToast } from '@/store/notifications'
import { updateUser } from '@/store/user-slice'
import { Avatar, Button, DateInput, Icon, Select, Text, TextArea, TextInput } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import type { TCity, TUser } from '@/utils'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useOutletContext } from 'react-router-dom'

import styles from './ProfileInfo.module.css'

interface ProfileInfoProps {
  cities: TCity[]
  user?: TUser | null
}

export const ProfileInfo = () => {
  const { user, cities } = useOutletContext<ProfileInfoProps>()
  const cityOptions: Option[] = cities.map((c) => ({ label: c.name, value: c.id }))

  const loading = useSelector((state: RootState) => state.user.loading)
  const error = useSelector((state: RootState) => state.user.error)
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
  const [gender, setGender] = useState(user?.gender ?? 'unspecified')
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

  const [avatarBase64, setAvatarBase64] = useState<string | undefined>(user?.avatar)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatarUrl(url)
      const base64 = await fileToBase64(file)
      setAvatarBase64(base64)
      setIsEdited(true)
    }
  }

  // преобразуем в base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const dispatch = useDispatch<AppDispatch>()

  const handleSave = async () => {
    const formData = {
      name,
      birthDate: birthDate?.toISOString(),
      gender,
      city: city,
      about,
      avatar: avatarBase64,
    }
    try {
      await dispatch(updateUser(formData)).unwrap()
      dispatch(
        addToast({
          id: Date.now().toString(),
          user: '',
          text: 'Данные сохранены',
          date: new Date().toISOString(),
          isRead: false,
          link: '',
        })
      )
      setIsEdited(false)
    } catch {
      dispatch(
        addToast({
          id: Date.now().toString(),
          user: '',
          text: 'Ошибка сохранения',
          date: new Date().toISOString(),
          isRead: false,
          link: '',
        })
      )
    }
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
            disabled
            onChange={(val) => {
              setEmail(val)
              setIsEdited(true)
            }}
            //icon="edit"
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
                if (option && !Array.isArray(option)) {
                  setGender(option.value as 'male' | 'female' | 'unspecified')
                  setIsEdited(true)
                }
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
        {error && <div className={styles.error}>{error}</div>}
        <Button onClick={handleSave} disabled={!isEdited || loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
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
