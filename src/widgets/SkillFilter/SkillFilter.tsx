import { useState } from 'react'

import arrowDownIcon from '../../assets/svg/arrow-down.svg'
import arrowUpIcon from '../../assets/svg/arrow-up.svg'
import { Checkbox } from '../../ui-kit/Checkbox/Checkbox'
import { MenuButton } from '../../ui-kit/MenuButton/MenuButton'
import { Text } from '../../ui-kit/Text/Text'
import styles from './SkillFilter.module.css'

export const SKILSGILTER_CATEGORY: Group[] = [
  {
    id: '1',
    label: 'Бизнес и карьера',
    items: [
      { id: '1-1', label: 'Управление командой' },
      { id: '1-2', label: 'Маркетинг и реклама' },
      { id: '1-3', label: 'Продажи и переговоры' },
      { id: '1-4', label: 'Личный бренды' },
      { id: '1-5', label: 'Резюме и собеседование' },
      { id: '1-6', label: 'Тайм-менеджмент' },
      { id: '1-7', label: 'Проектное управление' },
      { id: '1-8', label: 'Предпринимательство' },
    ],
  },
  {
    id: '2',
    label: 'Творчество и искусство',
    items: [
      { id: '2-1', label: 'Рисование и иллюстрация' },
      { id: '2-2', label: 'Фотография' },
      { id: '2-3', label: 'Видеомонтаж' },
      { id: '2-4', label: 'Музыка и звук' },
      { id: '2-5', label: 'Актёрское мастерство' },
      { id: '2-6', label: 'Креативное письмо' },
      { id: '2-7', label: 'Арт-терапия' },
      { id: '2-8', label: 'Декор и DIY' },
    ],
  },
  {
    id: '3',
    label: 'Иностранные языки',
    items: [
      { id: '3-1', label: 'Английский' },
      { id: '3-2', label: 'Испанский' },
      { id: '3-3', label: 'Французский' },
      { id: '3-4', label: 'Немецкий' },
      { id: '3-5', label: 'Китайский' },
      { id: '3-6', label: 'Японский' },
      { id: '3-7', label: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    id: '4',
    label: 'Образование и развитие',
    items: [
      { id: '4-1', label: 'Личностное развитие' },
      { id: '4-2', label: 'Навыки обучения' },
      { id: '4-3', label: 'Когнитивные техники' },
      { id: '4-4', label: 'Скорочтение' },
      { id: '4-5', label: 'Навыки преподавания' },
      { id: '4-6', label: 'Коучинг' },
    ],
  },
  {
    id: '5',
    label: 'Здоровье и лайфстайл',
    items: [
      { id: '5-1', label: 'Йога и медитация' },
      { id: '5-2', label: 'Питание и ЗОЖ' },
      { id: '5-3', label: 'Ментальное здоровье' },
      { id: '5-4', label: 'Осознанность' },
      { id: '5-5', label: 'Физические тренировки' },
      { id: '5-6', label: 'Сон и восстановление' },
      { id: '5-7', label: 'Баланс жизни и работы' },
    ],
  },
  {
    id: '6',
    label: 'Дом и уют',
    items: [
      { id: '6-1', label: 'Уборка и организация' },
      { id: '6-2', label: 'Домашние финансы' },
      { id: '6-3', label: 'Приготовление еды' },
      { id: '6-4', label: 'Домашние растения' },
      { id: '6-5', label: 'Ремонт' },
      { id: '6-6', label: 'Хранение вещей' },
    ],
  },
]

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
