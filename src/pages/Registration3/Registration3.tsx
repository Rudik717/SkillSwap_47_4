import { Text } from '@/ui-kit'
import { TextInput } from '@/ui-kit'
import { Button } from '@/ui-kit'
import { Icon } from '@/ui-kit'
import { Select } from '@/ui-kit'
import { TextArea } from '@/ui-kit'
import { Stepper } from '@/widgets'
import { FormLayout } from '@/widgets'

import styles from './Registration3.module.css'

/*TODO: использовать тип RegisterDataSet */

export const Registration3 = () => {
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
                error=""
                value={''}
                onChange={() => {}}
              />
              <Select
                name="category"
                label="Категория навыка"
                placeholder="Выберете категорию навыка"
                value={null}
                options={[]}
                error=""
                onChange={() => {}}
              />
              <Select
                name="subcategory"
                label="Подкатегория навыка"
                placeholder="Выберете подкатегорию навыка"
                value={null}
                options={[]}
                error=""
                onChange={() => {}}
              />
              <div className={styles.field}>
                <TextArea
                  name="description"
                  label="Описание"
                  placeholder="Коротко опишите, чему хотите научить"
                  error=""
                  className={styles.textArea}
                  onChange={() => {}}
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
                    accept="image/jpeg, image/png"
                    className={styles.imagesInput}
                    onChange={() => {}}
                  />
                  {/*Контейнер для загруженного изображения*/}
                  <div id="previewArea">{/*Сюда будет добавлены img*/}</div>
                </div>
                <div></div>
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
