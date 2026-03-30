import { Icon, Text } from '@/ui-kit'

import styles from './CategoriesMenu.module.css'

type IconName =
  | 'search'
  | 'sort'
  | 'arrow-down'
  | 'arrow-right'
  | 'bell'
  | 'calendar'
  | 'clock'
  | 'cross'
  | 'edit'
  | 'eye'
  | 'gallery-add'
  | 'idea'
  | 'like'
  | 'logout'
  | 'message'
  | 'moon'
  | 'more-square'
  | 'request'
  | 'share'
  | 'user'

interface Category {
  name: string
  subcategories: string[]
  iconColor: string
  iconName?: IconName // теперь только допустимые имена
}

interface CategoriesMenuProps {
  categories: Category[]
  onCategoryClick?: (category: Category) => void
  onSubcategoryClick?: (subcategory: string, category: Category) => void
}

const leftHeights = [316, 280, 244]
const rightHeights = [316, 244, 280]

export const CategoriesMenu = ({
  categories,
  onCategoryClick,
  onSubcategoryClick,
}: CategoriesMenuProps) => {
  const leftCategories = categories.filter((_, index) => index % 2 === 0)
  const rightCategories = categories.filter((_, index) => index % 2 === 1)

  const renderCategory = (category: Category, height: number) => (
    <div key={category.name} className={styles.category} style={{ height: `${height}px` }}>
      <div className={styles.row}>
        <div className={styles.iconWrapper} style={{ backgroundColor: category.iconColor }}>
          {/* замени "cross" на category.iconName, когда будут готовы разные иконки */}
          <Icon name={(category.iconName as any) || 'cross'} size={40} />
        </div>
        <div className={styles.content}>
          <div className={styles.categoryHeader} onClick={() => onCategoryClick?.(category)}>
            <Text className={styles.categoryTitle}>{category.name}</Text>
          </div>
          <div className={styles.subcategories}>
            {category.subcategories.map((sub) => (
              <div
                key={sub}
                className={styles.subcategory}
                onClick={() => onSubcategoryClick?.(sub, category)}
              >
                <Text className={styles.subcategoryText}>{sub}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.menu}>
      <div className={styles.columns}>
        <div className={styles.column}>
          {leftCategories.map((cat, idx) => renderCategory(cat, leftHeights[idx]))}
        </div>
        <div className={styles.column}>
          {rightCategories.map((cat, idx) => renderCategory(cat, rightHeights[idx]))}
        </div>
      </div>
    </div>
  )
}
