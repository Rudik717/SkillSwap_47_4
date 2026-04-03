import { useOutsideClick } from '@/utils'
import { CategoriesMenu } from '@/widgets/CategoriesMenu/CategoriesMenu'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from '../../ui-kit/Logo/Logo'
import { Text } from '../../ui-kit/Text/Text'
import styles from './Footer.module.css'

export const Footer = () => {
  const [categoriesMenuVisible, setCategoriesMenuVisible] = useState(false)
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
  }
  const allCategoriesRef = useRef<HTMLDivElement | null>(null)
  useOutsideClick({
    ref: allCategoriesRef,
    handler: () => setCategoriesMenuVisible(false),
  })

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
          <Text variant="Caption" className={styles.copyright}>
            SkillSwap — 2025
          </Text>
        </div>

        <div className={styles.linksSection}>
          <Link to="/about" className={styles.link}>
            <Text>О проекте</Text>
          </Link>
          <Link
            to="#"
            className={styles.link}
            onClick={handlePlaceholderClick}
            aria-disabled="true"
          >
            <Text>Контакты</Text>
          </Link>
          <Link
            to="#"
            className={styles.link}
            onClick={handlePlaceholderClick}
            aria-disabled="true"
          >
            <Text>Политика конфиденциальности</Text>
          </Link>
          <div ref={allCategoriesRef}>
            <button
              className={styles.allCategoriesButton}
              onClick={() => setCategoriesMenuVisible(!categoriesMenuVisible)}
            >
              Все навыки
            </button>
            <div
              className={`${styles.categoriesMenu} ${categoriesMenuVisible ? styles.active : ''}`}
            >
              <CategoriesMenu />
            </div>
          </div>
          <Link
            to="#"
            className={styles.link}
            onClick={handlePlaceholderClick}
            aria-disabled="true"
          >
            <Text>Блог</Text>
          </Link>
          <Link
            to="#"
            className={styles.link}
            onClick={handlePlaceholderClick}
            aria-disabled="true"
          >
            <Text>Пользовательское соглашение</Text>
          </Link>
        </div>
      </div>
    </footer>
  )
}
