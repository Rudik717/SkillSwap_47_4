import { useState } from 'react'

import arrowDownIcon from '../../assets/svg/arrow-down.svg'
import arrowUpIcon from '../../assets/svg/arrow-up.svg'
import { Checkbox } from '../../ui-kit/Checkbox/Checkbox'
import { MenuButton } from '../../ui-kit/MenuButton/MenuButton'
import { Text } from '../../ui-kit/Text/Text'
import styles from './SkillFilter.module.css'

export type Item = {
  id: string
  label: string
}

export type Group = {
  id: string
  label: string
  items: Item[]
}

interface SkillFilterProps {
  options: Group[]
  value?: string[]
  onChange?: (selectedId: string) => void
}

export const SkillFilter = ({
  options /**TODO: использовать пропс value из интерфейса*/,
  onChange,
}: SkillFilterProps) => {
  //Состояние для открытия/закрытия
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  // Функция переключения иконки в зависимости от состояния группы
  const getArrowIcon = (groupId: string) => {
    return expandedGroups.has(groupId) ? arrowUpIcon : arrowDownIcon
  }

  // Изменение стилизации кнопки "стрелка" при раскрытии/скрытии
  const arrowIcon = options.every((group) => expandedGroups.has(group.id))
    ? arrowUpIcon
    : arrowDownIcon

  // Обработчик для переключения кнопки для отдельной подкатегории по ее id
  const toggleGroupExpansion = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(groupId)) {
        newSet.delete(groupId)
      } else {
        newSet.add(groupId)
      }
      return newSet
    })
  }

  // Обработчик для глобального раскрытия/скрытия всех групп
  const toggleGlobalExpansion = () => {
    const allExpanded = options.every((group) => expandedGroups.has(group.id))

    if (allExpanded) {
      setExpandedGroups(new Set())
    } else {
      const allIds = new Set(options.map((group) => group.id))
      setExpandedGroups(allIds)
    }
  }

  /** TODO: Нужно реализовать отслеживание кликов на чекбоксы*/
  // Обработчик для выбранных категорий/подкатегорий
  const handleItemSelected = (itemId: string) => {
    if (onChange) {
      onChange(itemId)
    }
  }

  return (
    <div>
      <Text variant="H3" children="Навыки" className={styles.heading} />
      {options.map((option) => {
        // Определяем, раскрыта ли текущая группа
        const isGroupExpanded = expandedGroups.has(option.id)
        const displayItems = isGroupExpanded ? option.items || [] : []

        return (
          <div key={option.id} className={styles.container}>
            <div className={styles.category}>
              <Checkbox
                key={option.id}
                state="indeterminate"
                onClick={() => handleItemSelected(option.id)}
                children={option.label}
              />
              {option.items && (
                <MenuButton
                  iconColor="text"
                  color="var(--skill-box-text-color)"
                  arrowIcon={getArrowIcon(option.id)}
                  onPress={() => toggleGroupExpansion(option.id)}
                  style={{ display: 'inline' }}
                />
              )}
            </div>
            <ul className={styles.itemsList}>
              {displayItems.map((item) => (
                <li key={item.id} className={styles.item}>
                  <Checkbox
                    key={item.id}
                    state="checked"
                    onClick={() => handleItemSelected(item.id)}
                    children={item.label}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
      })}
      <MenuButton
        children="Все категории"
        iconColor="text"
        color="var(--skill-box-text-color)"
        onPress={toggleGlobalExpansion}
        arrowIcon={arrowIcon}
        style={{ paddingLeft: '0' }}
      />
    </div>
  )
}
