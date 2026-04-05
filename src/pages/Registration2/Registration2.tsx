//import { useState } from 'react'
//import type { AppDispatch } from '@/store'
import { getCategoriesState } from '@/store/categories'
import { getCitiesState } from '@/store/cities'
import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { DateInput } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'
import { useSelector } from 'react-redux'

///import type { RegisterDataSet } from '@/utils'
import styles from './Registration2.module.css'

//import { useCallback } from 'react'

// Опции для выбора пола
const genderOptions: Option[] = [
  { label: 'Не указан', value: 'unspecified' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
]
/*
interface FieldErrors {
  name?: string;
  birthDate?: string;
  gender?: string;
  city?: string;
  category?: string;
  subcategory?: string;
}

type InputsState = {
  avatar: string | null;
  name: string;
  birthDate: Date | null;
  city: string;
  gender: string;
  category: string;
  subCategory: string;
};
*/

export const Registration2 = (/*{data, setData, nextStep, prevStep}: RegisterDataSet*/) => {
  // const dispatch = useDispatch<AppDispatch>;
  const { categories, subcategories } = useSelector(getCategoriesState)
  const { cities } = useSelector(getCitiesState)

  if (!categories || !subcategories) {
    return null
  }

  const cityOptions: Option[] = cities.map((city) => ({
    value: city.id,
    label: city.name,
  }))

  const categoryOptions: Option[] = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))

  const subcategoryOptions: Option[] = subcategories.map((subcategory) => ({
    value: subcategory.id,
    label: subcategory.name,
  }))
  /*
  const [errors, setErrors] = useState({
    name: '',
    birthDate: '',
    gender: '',
    city: '',
    category: '',
    subcategory: ''
  });
  
  const [inputs, setInputs] = useState<InputsState>({
    avatar: '', //Аватарку выбирать не обязательно
    name: '',
    birthDate: null,
    city: '',
    gender: '',
    category: '',
    subCategory: ''
  });
*/

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
                error=""
                value={''}
                onChange={() => {}}
              />
              <div className={styles.dateGenderBlock}>
                <div className={styles.field}>
                  <DateInput
                    label="Дата рождения"
                    placeholder="дд.мм.гггг"
                    value={null}
                    onChange={() => {}}
                  />
                </div>
                <div className={styles.field}>
                  <Select
                    label="Пол"
                    placeholder="Не указан"
                    value={null}
                    options={genderOptions}
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <Select
                  label="Город"
                  placeholder="Не указан"
                  value={null}
                  options={cityOptions}
                  onChange={() => {}}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Категория навыка, которому хотите научиться"
                  placeholder="Выберете категорию"
                  value={null}
                  options={categoryOptions}
                  error=""
                  onChange={() => {}}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Подкатегория навыка, которому хотите научиться"
                  placeholder="Выберете подкатегорию"
                  value={null}
                  options={subcategoryOptions}
                  error=""
                  onChange={() => {}}
                />
              </div>
              <div className={styles.buttons}>
                <Button variant="secondary" children="Назад" disabled={false} onClick={() => {}} />
                <Button
                  variant="primary"
                  children="Продолжить"
                  disabled={false}
                  onClick={() => {}}
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
