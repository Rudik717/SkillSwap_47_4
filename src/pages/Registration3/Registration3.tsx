import { getCategoriesState } from '@/store/categories'
import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { TextArea } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import type { RegisterDataSet } from '@/utils'
import { type TSkillData } from '@/utils'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { skillFilterOptions } from '@/widgets/FilterPanel/utils'
import { useEffect, useState } from 'react'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

import styles from './Registration3.module.css'

interface FieldErrors {
  title: string
  description: string
}

type InputsState = {
  title?: string
  category: string
  subcategory: string
  description?: string
  images?: string[] | null
  createdAt?: string
  updatedAt?: string
}

export const Registration3 = ({ data, setData, nextStep, prevStep }: RegisterDataSet) => {
  // ДАННЫЕ ИЗ ГЛОБАЛЬНОГО СОСТОЯНИЯ
  const { categories, subcategories } = useSelector(getCategoriesState)
  const options = skillFilterOptions({ categories, subcategories })

  // СТЕЙТЫ
  const [errors, setErrors] = useState<FieldErrors>({ title: '', description: '' })
  const [subcategoryOptions, setSubcategoryOptions] = useState<Option[]>([])
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [skills, setSkills] = useState<TSkillData[]>(data.skills || [])

  const [inputs, setInputs] = useState<InputsState>({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    images: [],
    createdAt: '',
    updatedAt: '',
  })

  // ПРОИЗВОДНЫЕ ДАННЫЕ
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
    if (!inputs.title || !inputs.description || !inputs.category || !inputs.subcategory) return

    const selectedCategory = options.find((item) => item.id === inputs.category)
    const skillExists = skills.some(
      (skill) =>
        skill.title === inputs.title &&
        skill.category === inputs.category &&
        skill.subcategory === inputs.subcategory
    )

    if (!skillExists && selectedCategory) {
      const newSkill: TSkillData = {
        id: '',
        userId: data.id,
        type: 'teach',
        category: selectedCategory.id,
        subcategory: inputs.subcategory,
        title: inputs.title,
        description: inputs.description,
        images: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setSkills((prev) => [...prev, newSkill])
    }
  }, [inputs.title, inputs.description, inputs.category, inputs.subcategory, skills, data.id])

  useEffect(() => {
    setIsVerified(
      inputs.title !== '' &&
        !errors.title &&
        inputs.description !== '' &&
        !errors.description &&
        inputs.category !== '' &&
        inputs.subcategory !== ''
    )
  }, [
    inputs.title,
    errors.title,
    inputs.description,
    errors.description,
    inputs.category,
    inputs.subcategory,
  ])

  // --- ОБРАБОТЧИКИ СОБЫТИЙ --- //
  // Обработчик для названия навыка
  const handleTitleChange = useCallback(
    (value: string) => {
      if (value.length < 3) {
        setErrors((prev) => ({ ...prev, title: 'Название навыка должно быть не менее 3 символов' }))
      } else if (value.length > 50) {
        setErrors((prev) => ({
          ...prev,
          title: 'Название навыка должно быть не более 50 символов',
        }))
      } else setErrors((prev) => ({ ...prev, title: '' }))

      setInputs((prev) => ({ ...prev, title: value }))
    },
    [setErrors, setInputs]
  )

  // Обработчик для описания навыка
  const handleDescriptionChange = useCallback(
    (value: string) => {
      if (value.length > 500) {
        setErrors((prev) => ({
          ...prev,
          description: ' Описание не должно превышать 500 символов',
        }))
      } else setErrors((prev) => ({ ...prev, description: '' }))
      setInputs((prev) => ({ ...prev, description: value }))
    },
    [setErrors, setInputs]
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

  const handleCategoryChange = createSelectHandler('category')
  const handleSubcategoryChange = createSelectHandler('subcategory')

  // Обработчик перехода на следующий шаг регистрации
  const handleNextStep = () => {
    setData((prev) => ({
      ...prev,
      skills: skills,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
    if (isVerified) {
      nextStep()
    }
  }

  return (
    <>
      <Stepper currentStep={3} />
      <FormLayout
        children={
          <>
            <div className={styles.container}>
              <TextInput
                name="skill"
                type="text"
                label="Название навыка"
                placeholder="Введите название вашего навыка"
                error={errors.title}
                value={inputs.title}
                onChange={handleTitleChange}
              />
              <Select
                name="category"
                label="Категория навыка"
                placeholder="Выберете категорию навыка"
                value={
                  inputs.category
                    ? categoryOptions.find((el) => el.value === inputs.category)
                    : null
                }
                options={categoryOptions}
                onChange={handleCategoryChange}
              />
              <Select
                name="subcategory"
                label="Подкатегория навыка"
                placeholder="Выберете подкатегорию навыка"
                value={
                  inputs.category
                    ? subcategoryOptions.find((el) => el.value === inputs.category)
                    : null
                }
                options={subcategoryOptions}
                onChange={handleSubcategoryChange}
              />
              <div className={styles.field}>
                <TextArea
                  name="description"
                  label="Описание"
                  placeholder="Коротко опишите, чему хотите научить"
                  error={errors.description}
                  className={styles.textArea}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div id="dropArea" className={styles.dropArea}>
                <Text
                  variant="Body"
                  children={'Перетащите или выберете изображение навыка'}
                  as="span"
                  className={styles.textSpan}
                />
                <div className={styles.imagesContainer}>
                  <Icon name="gallery-add" stroke="#508826" />
                  <Text
                    variant="Body"
                    children={'Выбрать изображения'}
                    as="span"
                    className={styles.textDescription}
                  />
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                    multiple
                    className={styles.imagesInput}
                  />
                  {/*Контейнер для загруженного изображения*/}
                  <div id="previewArea">{/*Сюда будет добавлены img*/}</div>
                </div>
                <div></div>
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
              <Icon name="school-board" size={300} />
              <div className={styles.textBlock}>
                <Text variant="H2" className={styles.header}>
                  Укажите, чем вы готовы поделиться
                </Text>
                <Text variant="Body" className={styles.textAlign}>
                  Так другие люди смогут увидеть ваши предложения и{'\u00A0'}предложить вам обмен!
                </Text>
              </div>
            </div>
          </>
        }
      />
    </>
  )
}
