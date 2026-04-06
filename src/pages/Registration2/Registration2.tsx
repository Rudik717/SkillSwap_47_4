import { getCategoriesState } from '@/store/categories'
import { getCitiesState } from '@/store/cities'
import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { DateInput } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import type { RegisterDataSet } from '@/utils'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { skillFilterOptions } from '@/widgets/FilterPanel/utils'
import { useEffect, useState } from 'react'
import { useCallback } from 'react'
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
  avatar: string | null
  name: string
  birthDate: Date | null
  city: string
  gender: string
  category: string
  subcategory: string
}

export const Registration2 = ({ data, setData, nextStep, prevStep }: RegisterDataSet) => {
  const { cities } = useSelector(getCitiesState)
  const { categories, subcategories } = useSelector(getCategoriesState)
  const options = skillFilterOptions({ categories, subcategories })
  const [errors, setErrors] = useState<FieldErrors>({ name: '' })
  const [subcategoryOptions, setSubcategoryOptions] = useState<Option[]>([])
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [inputs, setInputs] = useState<InputsState>({
    avatar: data.avatar, //Аватарку пока не сделала
    name: data.name,
    birthDate: data.birthDate,
    city: data.city,
    gender: data.gender,
    category: data.learnSkill.category,
    subcategory: data.learnSkill.subcategory,
  })

  const cityOptions: Option[] = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }))

  const categoryOptions: Option[] = options.map((category) => ({
    value: category.id,
    label: category.label,
  }))

  useEffect(() => {
    // Находим категорию по id
    const selectedCategory = options.find((item) => item.id === inputs.category)

    // Получаем массив подкатегорий в формате Option
    const newSubcategoryOptions: Option[] = selectedCategory
      ? selectedCategory.items.map((item) => ({
          value: item.id,
          label: item.label,
        }))
      : []

    // Сохраняем в стейте
    setSubcategoryOptions(newSubcategoryOptions)
  }, [inputs.category, options])

  // Обработчик для поля name
  const handlTextChange = useCallback(
    (value: string) => {
      const forbiddenChars = /[@.]/
      if (forbiddenChars.test(value)) {
        setErrors((prev) => ({ ...prev, name: 'Имя не должно содержать символы @ и .' }))
      } else if (!value) {
        setErrors((prev) => ({ ...prev, name: 'Введите ваше имя' }))
      } else setErrors((prev) => ({ ...prev, name: '' }))

      setInputs((prev) => ({ ...prev, name: value }))
    },
    [setErrors, setInputs]
  )

  const minDate = new Date('1900-01-01')
  const maxDate = new Date() // сегодня

  // Обработчик для даты  рождения
  const handleDateChange = useCallback(
    (date: Date | null) => {
      setInputs((prev) => ({ ...prev, birthDate: date }))
    },
    [setInputs]
  )

  // Универсальный обработчик для select
  const createSelectHandler = useCallback(
    (fieldName: string) => (option: Option | Option[] | null) => {
      const selectedOption = Array.isArray(option) ? option[0] : option

      if (!selectedOption) {
        setInputs((prev) => ({ ...prev, [fieldName]: '' }))
        return
      }
      setInputs((prev) => ({ ...prev, [fieldName]: selectedOption.value }))
    },
    [setInputs]
  )
  const handleGenderChange = createSelectHandler('gender')
  const handleCityChange = createSelectHandler('city')
  const handleCategoryChange = createSelectHandler('category')
  const handleSubcategoryChange = createSelectHandler('subcategory')

  useEffect(() => {
    setIsVerified(
      inputs.name !== '' &&
        !errors.name &&
        inputs.birthDate !== null &&
        inputs.city !== '' &&
        inputs.gender !== '' &&
        inputs.category !== '' &&
        inputs.subcategory !== ''
    )
  }, [errors.name, inputs])

  // Обработчик перехода на следующий шаг регистрации
  const handleNextStep = () => {
    setData((prev) => ({
      ...prev,
      avatar: inputs.avatar,
      name: inputs.name,
      birthDate: inputs.birthDate,
      city: inputs.city,
      gender: inputs.gender,
      learnSkill: {
        category: inputs.category,
        subcategory: inputs.subcategory,
      },
    }))
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
              <div className={styles.avatarContainer}>
                <div className={styles.avatarIcon}>
                  <Icon name="user-circle" size={54} />
                  <div className={styles.iconAddPosition}>
                    <Icon name="add" size={16} />
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  className={styles.avatarInput}
                  onChange={() => {}}
                />
              </div>
              <TextInput
                name="name"
                type="text"
                label="Имя"
                placeholder="Введите ваше имя"
                error={errors.name ? errors.name : ''}
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
                    inputs.category ? cityOptions.find((el) => el.value === inputs.category) : null
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
                  error=""
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
