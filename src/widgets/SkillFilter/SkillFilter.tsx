import { useState } from 'react'

import arrowDownIcon from '../../assets/svg/arrow-down.svg'
import arrowUpIcon from '../../assets/svg/arrow-up.svg'
import { Checkbox } from '../../ui-kit/Checkbox/Checkbox'
import { MenuButton } from '../../ui-kit/MenuButton/MenuButton'
import { Text } from '../../ui-kit/Text/Text'
import styles from './SkillFilter.module.css'

export const SKILSGILTER_CATEGORY: Group[] = [
  {
    id: 'bfe39848-5729-453f-9007-c3a719f40106',
    label: 'Бизнес и карьера',
    items: [
      { id: '1', label: 'Управление командой' },
      { id: '2', label: 'Маркетинг и реклама' },
      { id: '2', label: 'Продажи и переговоры' },
      { id: '3', label: 'Личный бренды' },
      { id: '4', label: 'Резюме и собеседование' },
      { id: '5', label: 'Тайм-менеджмент' },
      { id: '6', label: 'Проектное управление' },
      { id: '7', label: 'Предпринимательство' },
    ],
  },
  {
    id: '08e3b174',
    label: 'Иностранные языки',
    items: [
      { id: '8', label: 'Английский' },
      { id: '9', label: 'Французский' },
      { id: '10', label: 'Испанский' },
      { id: '11', label: 'Немецкий' },
      { id: '12', label: 'Китайский' },
      { id: '13', label: 'Японский' },
      { id: '14', label: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    id: '77a924ee',
    label: 'Дом и уют',
    items: [
      { id: '15', label: 'Уборка и организация' },
      { id: '16', label: 'Домашние финансы' },
      { id: '17', label: 'Приготовление еды' },
      { id: '18', label: 'Домашние растения' },
      { id: '19', label: 'Ремонт' },
      { id: '20', label: 'Хранение вещей' },
    ],
  },
  {
    id: '54b36f49',
    label: 'Творчество и искусство',
    items: [
      { id: '21', label: 'Рисование и иллюстрация' },
      { id: '22', label: 'Фотография' },
      { id: '23', label: 'Видеомонтаж' },
      { id: '24', label: 'Музыка и звук' },
      { id: '25', label: 'Актёрское мастерство' },
      { id: '26', label: 'Креативное письмо' },
      { id: '27', label: 'Арт-терапия' },
      { id: '28', label: 'Декор и DIY' },
    ],
  },
  {
    id: '492f0fb1',
    label: 'Образование и развитие',
    items: [
      { id: '29', label: 'Личностное развитие' },
      { id: '30', label: 'Навыки обучения' },
      { id: '31', label: 'Когнитивные техники' },
      { id: '32', label: 'Скорочтение' },
      { id: '33', label: 'Навыки преподавания' },
      { id: '34', label: 'Коучинг' },
    ],
  },
  {
    id: '39e37f6a',
    label: 'Здоровье и лайфстайл',
    items: [
      { id: '34', label: 'Йога и медитация' },
      { id: '34', label: 'Питание и ЗОЖ' },
      { id: '34', label: 'Ментальное здоровье' },
      { id: '34', label: 'Осознанность' },
      { id: '34', label: 'Физические тренировки' },
      { id: '34', label: 'Сон и восстановление' },
      { id: '34', label: 'Баланс жизни и работы' },
    ],
  },
]

// Отдельный чекбокс элемент
export type Item = {
  id: string
  label: string
}

// Группа всех чекбокс‑элементов
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
  options,
  //value = [],
  onChange,
}: SkillFilterProps) => {
  /**СОСТОЯНИЯ */
  //Состояние для открытия/закрытия
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())

  //Состояние для отслеживания выбранных элементов
  // const [selectedItems, setSelectedItems] = useState<string[]>(value);

  // Функция переключения иконки в зависимости от состояния группы
  const getArrowIcon = (groupId: string) => {
    return expandedGroups.has(groupId) ? arrowUpIcon : arrowDownIcon
  }

  // Изменение стилизации кнопки "стрелка" при раскрытии/скрытии
  const arrowIcon = options.every((group) => expandedGroups.has(group.id))
    ? arrowUpIcon
    : arrowDownIcon

  // Обработчик для переключения кнопки для отдельной субкатегории по ее id
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
  // Обработчик для выбранных категорий/субкатегорий
  const handleItemSelected = (itemId: string) => {
    if (onChange) {
      onChange(itemId)
    }
  }

  return (
    <div className={styles.filter}>
      <Text variant="H3" children="Навыки" className={styles.heading} />
      {options.map((option) => {
        // Определяем, раскрыта ли текущая группа
        const isGroupExpanded = expandedGroups.has(option.id)
        const displayItems = isGroupExpanded ? option.items || [] : []

        return (
          <div key={option.id} className={styles.categotry}>
            <div className={styles.subcategory}>
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
                />
              )}
            </div>
            <ul className={styles.subsub}>
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
      />
    </div>
  )
}
