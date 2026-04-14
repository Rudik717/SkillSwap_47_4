import { getCategoriesState } from '@/store/categories'
import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { TextArea } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import type { RegisterDataSet } from '@/utils'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { skillFilterOptions } from '@/widgets/FilterPanel/utils'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useCallback, useMemo } from 'react'
import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Registration3.module.css'

interface FieldErrors {
  title: string
  description: string
  images: string
}

type InputsState = {
  title?: string
  category: string
  subcategory: string
  description?: string
  images?: string[] // URL для отображения в UI
  imageFiles: File[] // оригинальные файлы для расчёта размера
}

export const Registration3 = ({ data, setData, nextStep, prevStep }: RegisterDataSet) => {
  // ДАННЫЕ ИЗ ГЛОБАЛЬНОГО СОСТОЯНИЯ
  const { categories, subcategories } = useSelector(getCategoriesState)
  const options = skillFilterOptions({ categories, subcategories })

  // СТЕЙТЫ
  const [errors, setErrors] = useState<FieldErrors>({ title: '', description: '', images: '' })
  const [subcategoryOptions, setSubcategoryOptions] = useState<Option[]>([])
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const [inputs, setInputs] = useState<InputsState>({
    title: data.skills[1].title,
    category: data.skills[1].category,
    subcategory: data.skills[1].subcategory,
    description: data.skills[1].description,
    images: data.skills[1].images,
    imageFiles: [],
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
    setIsVerified(
      data.skills[1]?.title !== '' &&
        !errors.title &&
        data.skills[1]?.description !== '' &&
        !errors.description &&
        data.skills[1]?.category !== '' &&
        data.skills[1]?.subcategory !== ''
    )
  }, [data.skills, errors.title, errors.description])

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

      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill, idx) => (idx === 1 ? { ...skill, title: value } : skill)),
      }))

      setInputs((prev) => ({ ...prev, title: value }))
    },
    [setErrors, setData, setInputs]
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

      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill, idx) =>
          idx === 1 ? { ...skill, description: value } : skill
        ),
      }))

      setInputs((prev) => ({ ...prev, description: value }))
    },
    [setErrors, setInputs]
  )

  // Универсальный обработчик для select
  const createSelectHandler = useCallback(
    (fieldName: string) => (option: Option | Option[] | null) => {
      const selectedOption = Array.isArray(option) ? option[0] : option
      const value = selectedOption?.value || ''

      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill, idx) =>
          idx === 1 ? { ...skill, [fieldName]: value } : skill
        ),
      }))

      setInputs((prev) => ({ ...prev, [fieldName]: value }))

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

  // Обработчик для добавления изображении
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const MAX_TOTAL_SIZE = 2 * 1024 * 1024
    const existingFiles = inputs.imageFiles || []
    const existingTotalSize = existingFiles.reduce((total, file) => total + file.size, 0)
    const newFiles = Array.from(files)
    const newFilesTotalSize = newFiles.reduce((total, file) => total + file.size, 0)
    const totalSize = existingTotalSize + newFilesTotalSize

    if (totalSize > MAX_TOTAL_SIZE) {
      setErrors((prev) => ({
        ...prev,
        images: `Общий размер всех изображений не должен превышать 2 Мб`,
      }))
      e.target.value = ''
      return
    }

    const validNewFiles = newFiles.filter((file) => file.size <= MAX_TOTAL_SIZE)
    const invalidNewFiles = newFiles.filter((file) => file.size > MAX_TOTAL_SIZE)

    if (invalidNewFiles.length > 0) {
      setErrors((prev) => ({
        ...prev,
        images: 'Размер отдельных изображений не должен превышать 2 Мб',
      }))
    } else {
      setErrors((prev) => ({ ...prev, images: '' }))
    }

    if (validNewFiles.length > 0) {
      const newImageUrls = validNewFiles.map((file) => URL.createObjectURL(file))

      setInputs((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImageUrls],
        imageFiles: [...existingFiles, ...validNewFiles],
      }))

      setData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill, idx) =>
          idx === 1
            ? {
                ...skill,
                images: [...(skill.images || []), ...newImageUrls],
              }
            : skill
        ),
      }))
    }

    e.target.value = ''
  }

  // Обработчик для удаления изображения
  const handleRemoveImage = (index: number) => {
    const urlToRevoke = inputs.images?.[index]

    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, idx) =>
        idx === 1
          ? {
              ...skill,
              images: skill.images?.filter((_, i) => i !== index),
            }
          : skill
      ),
    }))

    setInputs((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }))

    if (urlToRevoke) {
      try {
        URL.revokeObjectURL(urlToRevoke)
      } catch (error) {
        console.warn('Ошибка при освобождении URL:', error)
      }
    }
  }

  const handleCategoryChange = createSelectHandler('category')
  const handleSubcategoryChange = createSelectHandler('subcategory')

  const handleNextStep = () => {
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
                    ? subcategoryOptions.find((el) => el.value === inputs.subcategory)
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
                  value={inputs.description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <div
                id="dropArea"
                className={clsx(styles.dropArea, {
                  [styles.overflowScroll]: inputs.images && inputs.images.length > 0,
                  [styles.overflowNone]: !(inputs.images && inputs.images.length > 0),
                  [styles.dropAreaError]: errors.images,
                })}
              >
                {inputs.images && inputs.images.length > 0 ? (
                  <>
                    <div id="previewArea" className={styles.previewContainer}>
                      {/* Контейнер для загруженных изображений */}
                      {inputs.images.map((imageUrl, index) => (
                        <div key={index} className={styles.imagePreview}>
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className={styles.previewImage}
                          />
                          <Button
                            className={styles.removeButton}
                            onClick={() => handleRemoveImage(index)}
                            aria-label={`Удалить изображение ${index + 1}`}
                            children={'×'}
                          />
                        </div>
                      ))}
                    </div>
                    <div className={styles.imagesContainer}>
                      <Icon name="gallery-add" stroke="#508826" />
                      <Text
                        variant="Body"
                        children={'Выбрать изображения'}
                        as="span"
                        className={styles.textColor}
                      />
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        multiple
                        className={styles.imagesInput}
                        onChange={handleImageSelect}
                      />
                    </div>
                  </>
                ) : (
                  <>
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
                        color="#508826"
                        as="span"
                        className={styles.texColor}
                      />
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        multiple
                        className={styles.imagesInput}
                        onChange={handleImageSelect}
                      />
                    </div>
                  </>
                )}
              </div>
              {errors.images && (
                <Text
                  variant="Caption"
                  children={errors.images}
                  as="span"
                  className={styles.textError}
                />
              )}

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
