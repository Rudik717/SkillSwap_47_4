import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import { CategoriesMenu } from './CategoriesMenu'

interface Category {
  id: string
  name: string
  color: string
  icon: string
  subcategories: string[]
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Бизнес и карьера',
    color: '--category-business',
    icon: 'briefcase',
    subcategories: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство',
    ],
  },
  {
    id: '2',
    name: 'Творчество и искусство',
    color: '--category-creative',
    icon: 'palette',
    subcategories: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY',
    ],
  },
  {
    id: '3',
    name: 'Иностранные языки',
    color: '--category-languages',
    icon: 'earth',
    subcategories: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)',
    ],
  },
  {
    id: '4',
    name: 'Образование и развитие',
    color: '--category-education',
    icon: 'book',
    subcategories: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг',
    ],
  },
  {
    id: '5',
    name: 'Дом и уют',
    color: '--category-home',
    icon: 'home',
    subcategories: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей',
    ],
  },
  {
    id: '6',
    name: 'Здоровье и лайфстайл',
    color: '--category-health',
    icon: 'list',
    subcategories: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы',
    ],
  },
]

const meta: Meta<typeof CategoriesMenu> = {
  title: 'Widgets/CategoriesMenu',
  component: CategoriesMenu,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj = {
  args: {
    categories: mockCategories,
    onCategoryClick: action('category clicked'),
    onSubcategoryClick: action('subcategory clicked'),
  },
}
