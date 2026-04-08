import type { AppDispatch } from '@/store'
import { filterCountSelector, isFilterActiveSelector, resetFilter } from '@/store/filter'
import { Icon, Text } from '@/ui-kit'
import { useDispatch, useSelector } from 'react-redux'

import { GenderFilter } from '../GenderFilter/GenderFilter'
import { RoleFilter } from '../RoleFilter/RoleFilter'
import { CityFilter } from './CityFilter'
import styles from './FilterPanel.module.css'
import { SkillFilter } from './SkillFilter'

export const FilterPanel = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isFilterActive = useSelector(isFilterActiveSelector)
  const filterCount = useSelector(filterCountSelector)
  const count = filterCount ? `(${filterCount})` : ''

  const style = isFilterActive ? { background: 'var(--bg)' } : { background: 'var(--bg-footer)' }

  const onResetClick = () => {
    dispatch(resetFilter())
  }

  return (
    <div className={styles.container} style={style}>
      <div className={styles.headingContainer}>
        <Text variant="H2">{`Фильтры ${count}`}</Text>

        {isFilterActive ? (
          <button className={styles.reset} onClick={onResetClick}>
            <Text>Сбросить</Text>
            <Icon name="cross" />
          </button>
        ) : null}
      </div>

      <RoleFilter />
      <SkillFilter />
      <GenderFilter />
      <CityFilter />
    </div>
  )
}
