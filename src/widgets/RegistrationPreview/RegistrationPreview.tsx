import { Button, Text } from '@/ui-kit'
import { Modal, UserGallery } from '@/widgets'
import { type FC, memo } from 'react'

import styles from './RegistrationPreview.module.css'
import type { TRegistrationPreview } from './type'

export const RegistrationPreview: FC<TRegistrationPreview> = memo(
  ({ data, isOpen, onEdit, onConfirm }) => {
    const { title, category, subcategory, description, images } = data

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
          </section>
          <article className={styles.card}>
            <section className={styles.infoSkill}>
              <div className={styles.infoSkillText}>
                <div className={styles.infoSkillTexTitle}>
                  <Text variant="H1" color={textColor}>
                    {title}
                  </Text>
                  <Text style={{ color: 'var(--border-input-main)' }}>
                    {category}/{subcategory}
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
