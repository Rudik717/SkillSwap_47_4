import { getAllCategories, getAllSubcategories } from '@/store/categories'
import { Icon, Text } from '@/ui-kit'
import { useSelector } from 'react-redux'

import styles from './CategoriesMenu.module.css'

// Явный список допустимых иконок (из мок-данных)
type IconName = 'briefcase' | 'palette' | 'earth' | 'book' | 'home' | 'list'

interface Category {
  id: string
  name: string
  color: string
  icon: IconName
  subcategories: string[]
}

interface CategoriesMenuProps {
  onCategoryClick?: (category: Category) => void
  onSubcategoryClick?: (subcategory: string, category: Category) => void
}

const leftHeights = [316, 280, 244]
const rightHeights = [316, 244, 280]

export const CategoriesMenu = ({ onCategoryClick, onSubcategoryClick }: CategoriesMenuProps) => {
  const categoryList = useSelector(getAllCategories)
  const subcategoryList = useSelector(getAllSubcategories)
  const categories = categoryList.map((cat) => ({
    ...cat,
    subcategories: subcategoryList
      .filter((sub) => sub.categoryId === cat.id)
      .map((sub) => sub.name),
  })) as Category[]
  const leftCategories = categories.filter((_, index) => index % 2 === 0)
  const rightCategories = categories.filter((_, index) => index % 2 === 1)

  const renderCategory = (category: Category, height: number) => (
    <div key={category.id} className={styles.category} style={{ height: `${height}px` }}>
      <div className={styles.row}>
        <div className={styles.iconWrapper} style={{ backgroundColor: `${category.color}` }}>
          <Icon name={category.icon} size={24} />
        </div>
        <div className={styles.content}>
          <div className={styles.categoryHeader} onClick={() => onCategoryClick?.(category)}>
            <Text className={styles.categoryTitle}>{category.name}</Text>
          </div>
          <div className={styles.subcategories}>
            {category.subcategories.map((sub) => (
              <div key={sub} onClick={() => onSubcategoryClick?.(sub, category)}>
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
