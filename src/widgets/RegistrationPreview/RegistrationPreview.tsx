import { getCategoriesState } from '@/store/categories'
import { Button, Text } from '@/ui-kit'
import { Modal, UserGallery } from '@/widgets'
import { skillFilterOptions } from '@/widgets/FilterPanel/utils'
import { type FC, memo } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import styles from './RegistrationPreview.module.css'
import type { TRegistrationPreview } from './type'

export const RegistrationPreview: FC<TRegistrationPreview> = memo(
  ({ data, isOpen, onEdit, onConfirm, error }) => {
    const { title, category, subcategory, description, images } = data
    const { categories, subcategories } = useSelector(getCategoriesState)

    const { categoryName, subcategoryName } = useMemo(() => {
      const options = skillFilterOptions({ categories, subcategories })

      const cat = options.find((item) => item.id === category)
      const subcat = cat?.items?.find((subitem) => subitem.id === subcategory)

      return {
        categoryName: cat?.label ?? 'Не указана',
        subcategoryName: subcat?.label ?? 'Не указана',
      }
    }, [category, subcategory, categories, subcategories])

    if (!isOpen) {
      return null
    }

    const textColor = 'var(--text)'

    return (
      <Modal onClose={onEdit} paddingTop={44} paddingBottom={72}>
        <div className={styles.content}>
          <section className={styles.header}>
            <Text variant="H2" color={textColor} className={styles.centered}>
              Ваше предложение
            </Text>
            <Text variant="Caption" color={textColor} className={styles.centered}>
              Пожалуйста, проверьте и подтвердите правильность данных
            </Text>
            {error && <div className={styles.error}>{error}</div>}
          </section>
          <article className={styles.card}>
            <section className={styles.infoSkill}>
              <div className={styles.infoSkillText}>
                <div className={styles.infoSkillTexTitle}>
                  <Text variant="H1" color={textColor}>
                    {title}
                  </Text>
                  <Text style={{ color: 'var(--border-input-main)' }}>
                    {categoryName}/{subcategoryName}
                  </Text>
                </div>
                <Text variant="Body" color={textColor}>
                  {description || 'Нет описания'}
                </Text>
              </div>
              <div className={styles.infoButtons}>
                <Button variant="secondary" onClick={onEdit} iconRight="edit">
                  Редактировать
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                  Готово
                </Button>
              </div>
            </section>
            {images && images.length > 0 && (
              <div className={styles.galleryWrapper}>
                <UserGallery images={images} navigation={false}></UserGallery>
              </div>
            )}
          </article>
        </div>
      </Modal>
    )
  }
)
