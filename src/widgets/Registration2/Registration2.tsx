import { getCategoriesState } from '@/store/categories'
import { getCitiesState } from '@/store/cities'
import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { DateInput } from '@/ui-kit'
import { Avatar } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import type { RegisterDataSet } from '@/utils'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { skillFilterOptions } from '@/widgets/FilterPanel/utils'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { useRef } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Registration2.module.css'

// Опции для выбора пола
const genderOptions: Option[] = [
  { label: 'Не указан', value: 'unspecified' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
]

interface FieldErrors {
  name: string
}

type InputsState = {
  avatar?: string
  name: string
  birthDate?: Date | null
  city?: string
  gender?: 'male' | 'female' | 'unspecified' | ''
  category: string
  subcategory: string
}

export const Registration2 = ({ data, setData, nextStep, prevStep }: RegisterDataSet) => {
  // ДАННЫЕ ИЗ ГЛОБАЛЬНОГО СОСТОЯНИЯ
  const { cities } = useSelector(getCitiesState)
  const { categories, subcategories } = useSelector(getCategoriesState)
  const options = skillFilterOptions({ categories, subcategories })

  // СТЕЙТЫ
  const [errors, setErrors] = useState<FieldErrors>({ name: '' })
  const [subcategoryOptions, setSubcategoryOptions] = useState<Option[]>([])
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const [inputs, setInputs] = useState<InputsState>({
    avatar: data.avatar,
    name: data.name,
    birthDate: data.birthDate,
    city: data.city,
    gender: data.gender,
    category: data.skills[0].category,
    subcategory: data.skills[0].subcategory,
  })

  // ПРОИЗВОДНЫЕ ДАННЫЕ
  const cityOptions: Option[] = useMemo(
    () =>
      cities.map((city) => ({
        value: city.id,
        label: city.name,
      })),
    [cities]
  )

  const categoryOptions: Option[] = useMemo(
    () =>
      options.map((category) => ({
        value: category.id,
        label: category.label,
      })),
    [options]
  )

  // ЭФФЕКТЫ
  useEffect(() => {
    const selectedCategory = options.find((item) => item.id === inputs.category)
    const newSubcategoryOptions: Option[] = selectedCategory
      ? selectedCategory.items.map((item) => ({
          value: item.id,
          label: item.label,
        }))
      : []

    setSubcategoryOptions(newSubcategoryOptions)
  }, [inputs.category])

  useEffect(() => {
    setData((prev) => {
      const updatedSkills = [...prev.skills]

      if (updatedSkills.length > 0) {
        updatedSkills[0] = {
          ...updatedSkills[0],
          category: inputs.category,
          subcategory: inputs.subcategory,
        }
      } else {
        updatedSkills.push({
          type: 'learn',
          category: inputs.category,
          subcategory: inputs.subcategory,
        })
      }

      return {
        ...prev,
        skills: updatedSkills,
      }
    })
  }, [inputs.category, inputs.subcategory])

  useEffect(() => {
    setIsVerified(
      data.name !== '' &&
        !errors.name &&
        data.birthDate !== null &&
        data.city !== '' &&
        data.gender !== '' &&
        data.skills[0].category !== '' &&
        data.skills[0].subcategory !== ''
    )
  }, [
    data.name,
    errors.name,
    data.birthDate,
    data.city,
    data.gender,
    data.skills[0].category,
    data.skills[0].subcategory,
  ])

  //ОБРАБОТЧИКИ СОБЫТИЙ
  // Обработчик для добавления аватара пользователя
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)

      setData((prev) => ({
        ...prev,
        avatar: url,
      }))
      setInputs((prev) => ({ ...prev, avatar: url }))
    }
  }

  // Обработчик для поля name
  const handlTextChange = useCallback(
    (value: string) => {
      const forbiddenChars = /[@.]/
      if (forbiddenChars.test(value)) {
        setErrors((prev) => ({ ...prev, name: 'Имя не должно содержать символы @ и .' }))
      } else if (!value) {
        setErrors((prev) => ({ ...prev, name: 'Введите ваше имя' }))
      } else setErrors((prev) => ({ ...prev, name: '' }))

      setData((prev) => ({
        ...prev,
        name: value,
      }))

      setInputs((prev) => ({ ...prev, name: value }))
    },
    [setErrors, setInputs, setData]
  )

  const minDate = new Date('1900-01-01')
  const maxDate = new Date() // сегодня

  // Обработчик для даты рождения
  const handleDateChange = useCallback(
    (date: Date | null) => {
      setData((prev) => ({
        ...prev,
        birthDate: date,
      }))

      setInputs((prev) => ({ ...prev, birthDate: date }))
    },
    [setData, setInputs]
  )

  // Универсальный обработчик для select
  const createSelectHandler = useCallback(
    (fieldName: string) => (option: Option | Option[] | null) => {
      const selectedOption = Array.isArray(option) ? option[0] : option
      const value = selectedOption?.value || ''

      setData((prev) => ({
        ...prev,
        [fieldName]: value,
      }))

      setInputs((prev) => ({ ...prev, [fieldName]: value }))

      // Если это категория, обновляем подкатегории
      if (fieldName === 'category') {
        const selectedCategory = options.find((item) => item.id === value)
        const newSubcategoryOptions: Option[] = selectedCategory
          ? selectedCategory.items.map((item) => ({
              value: item.id,
              label: item.label,
            }))
          : []

        setSubcategoryOptions(newSubcategoryOptions)
      }
    },
    [setData, setInputs, options]
  )

  const handleGenderChange = createSelectHandler('gender')
  const handleCityChange = createSelectHandler('city')
  const handleCategoryChange = createSelectHandler('category')
  const handleSubcategoryChange = createSelectHandler('subcategory')

  const handleNextStep = () => {
    if (isVerified) {
      nextStep()
    }
  }

  return (
    <>
      <Stepper currentStep={2} />
      <FormLayout
        children={
          <>
            <div className={styles.container}>
              <div className={styles.avatarContainer} onClick={handleAvatarClick}>
                <div className={styles.avatarIcon}>
                  {inputs.avatar ? (
                    <Avatar url={inputs.avatar} size={72} />
                  ) : (
                    <>
                      <Icon name="user-circle" size={54} />
                      <div className={styles.iconAddPosition}>
                        <Icon name="add" size={16} />
                      </div>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.avatarInput}
                  onChange={handleAvatarChange}
                  ref={fileInputRef}
                />
              </div>
              <TextInput
                name="name"
                type="text"
                label="Имя"
                placeholder="Введите ваше имя"
                error={errors.name}
                value={inputs.name}
                onChange={handlTextChange}
              />
              <div className={styles.dateGenderBlock}>
                <div className={styles.field}>
                  <DateInput
                    label="Дата рождения"
                    placeholder="дд.мм.гггг"
                    minDate={minDate}
                    maxDate={maxDate}
                    value={inputs.birthDate}
                    onChange={handleDateChange}
                  />
                </div>
                <div className={styles.field}>
                  <Select
                    label="Пол"
                    placeholder="Не указан"
                    value={
                      inputs.gender ? genderOptions.find((el) => el.value === inputs.gender) : null
                    }
                    options={genderOptions}
                    onChange={handleGenderChange}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <Select
                  label="Город"
                  placeholder="Не указан"
                  value={inputs.city ? cityOptions.find((el) => el.value === inputs.city) : null}
                  options={cityOptions}
                  onChange={handleCityChange}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Категория навыка, которому хотите научиться"
                  placeholder="Выберете категорию"
                  value={
                    inputs.category
                      ? categoryOptions.find((el) => el.value === inputs.category)
                      : null
                  }
                  options={categoryOptions}
                  onChange={handleCategoryChange}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Подкатегория навыка, которому хотите научиться"
                  placeholder="Выберете подкатегорию"
                  value={
                    inputs.subcategory
                      ? subcategoryOptions.find((el) => el.value === inputs.subcategory)
                      : null
                  }
                  options={subcategoryOptions}
                  onChange={handleSubcategoryChange}
                />
              </div>
              <div className={styles.buttons}>
                <Button variant="secondary" children="Назад" disabled={false} onClick={prevStep} />
                <Button
                  variant="primary"
                  children="Продолжить"
                  disabled={!isVerified}
                  onClick={handleNextStep}
                />
              </div>
            </div>
          </>
        }
        infoBlock={
          <>
            <div className={styles.infoBlock}>
              <Icon name="user-info" size={300} />
              <div className={styles.textBlock}>
                <Text variant="H2" className={styles.header}>
                  Расскажите немного о себе
                </Text>
                <Text variant="Body" className={styles.textAlign}>
                  Это поможет другим людям лучше вас узнать, чтобы{'\u00A0'}выбрать для обмена
                </Text>
              </div>
            </div>
          </>
        }
      />
    </>
  )
}
