import { useState } from 'react'

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
  selectedIds?: string[]
  onChange?: (selectedId: string) => void
}

export const SkillFilter = ({ options, onChange, selectedIds }: SkillFilterProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [showAllText, setShowAllText] = useState<boolean>(true)

  // Функция переключения иконки в зависимости от состояния группы
  const getArrowIcon = (groupId: string) => {
    return expandedGroups.has(groupId) ? 'arrow-up' : 'arrow-down'
  }

  // Изменение стилизации кнопки "стрелка" при раскрытии/скрытии
  const arrowIcon = options.every((group) => expandedGroups.has(group.id))
    ? 'arrow-up'
    : 'arrow-down'

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
      setShowAllText(true) // показываем «Все категории»
    } else {
      const allIds = new Set(options.map((group) => group.id))
      setExpandedGroups(allIds)
      setShowAllText(false) // показываем «Свернуть»
    }
  }

  const handleItemSelected = (itemId: string) => {
    onChange?.(itemId)
  }

  const checkboxState = (id: string) => {
    const selected = selectedIds?.includes(id)
    return selected ? 'checked' : 'unchecked'
  }

  const checkboxGroupState = (id: string) => {
    const group = options.find((g) => g.id === id)

    if (!group) {
      return 'unchecked'
    }

    const { items } = group
    const selectedItems = items.filter(({ id }) => selectedIds?.includes(id))

    if (!selectedItems.length) {
      return 'unchecked'
    }

    return selectedItems.length === items.length ? 'checked' : 'indeterminate'
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
                state={checkboxGroupState(option.id)}
                onClick={() => handleItemSelected(option.id)}
                children={option.label}
              />
              {option.items && (
                <MenuButton
                  iconColor="text"
                  color="var(--skill-box-text-color)"
                  iconName={getArrowIcon(option.id)}
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
                    state={checkboxState(item.id)}
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
        children={showAllText ? 'Все категории' : 'Свернуть'}
        iconColor="text"
        color="var(--skill-box-text-color)"
        onPress={toggleGlobalExpansion}
        iconName={arrowIcon}
        style={{ paddingLeft: '0' }}
      />
    </div>
  )
}
