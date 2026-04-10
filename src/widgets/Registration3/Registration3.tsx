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
  images?: string[]
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
    options,
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

  // Обработчик для добавления изображении
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const MAX_FILE_SIZE = 2 * 1024 * 1024

    // Фильтруем файлы: оставляем только те, что ≤ 2 МБ
    const validFiles = Array.from(files).filter((file) => file.size <= MAX_FILE_SIZE)

    // Собираем сообщения об ошибках для файлов, которые не прошли фильтр
    const errorMessages = Array.from(files).filter((file) => file.size > MAX_FILE_SIZE)

    // Показываем ошибки, если есть файлы, не прошедшие проверку
    if (errorMessages.length > 0) {
      setErrors((prev) => ({ ...prev, images: 'Размер изображений не должен превышать 2 Мб' }))
    } else {
      setErrors((prev) => ({ ...prev, images: '' }))
    }

    // Если есть валидные файлы, добавляем их в состояние
    if (validFiles.length > 0) {
      const newImageUrls = validFiles.map((file) => URL.createObjectURL(file))
      setInputs((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newImageUrls],
      }))
    }

    // Сбрасываем значение инпута, чтобы можно было повторно выбрать файлы
    e.target.value = ''
  }

  // Обработчик для удаления изображения
  const handleRemoveImage = (index: number) => {
    // Сохраняем URL для освобождения памяти
    const urlToRevoke = inputs.images?.[index]

    setInputs((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index),
    }))

    // Безопасное освобождение памяти
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
    setData((prev) => {
      // Создаём новый массив навыков
      const updatedSkills = [...prev.skills]

      if (updatedSkills.length > 0) {
        // Обновляем первый навык
        updatedSkills[1] = {
          ...updatedSkills[1],
          category: inputs.category,
          subcategory: inputs.subcategory,
          title: inputs.title,
          description: inputs.description,
          images: inputs.images,
        }
      } else {
        // Если навыков нет, создаём новый
        updatedSkills.push({
          type: 'teach',
          category: inputs.category,
          subcategory: inputs.subcategory,
          title: inputs.title,
          description: inputs.description,
          images: inputs.images,
        })
      }

      return {
        ...prev,
        skills: updatedSkills,
      }
    })

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
                          <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => handleRemoveImage(index)}
                            aria-label={`Удалить изображение ${index + 1}`}
                          >
                            ×
                          </button>
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
                  className={`${styles.textColor} ${styles.textInfo}`}
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
