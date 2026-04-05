import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { DateInput } from '@/ui-kit'
import type { Option } from '@/ui-kit/Select/Select'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'

import styles from './Registration2.module.css'

// Опции для выбора пола
const genderOptions: Option[] = [
  { label: 'Не указан', value: 'unspecified' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
]

/*TODO: использовать тип RegisterDataSet */

export const Registration2 = () => {
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
                  options={[]}
                  onChange={() => {}}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Категория навыка, которому хотите научиться"
                  placeholder="Выберете категорию"
                  value={null}
                  options={[]}
                  error=""
                  onChange={() => {}}
                />
              </div>
              <div className={styles.field}>
                <Select
                  label="Подкатегория навыка, которому хотите научиться"
                  placeholder="Выберете подкатегорию"
                  value={null}
                  options={[]}
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
