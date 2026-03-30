import type { Meta, StoryObj } from '@storybook/react-vite'

import { CategoriesMenu } from './CategoriesMenu'

const mockCategories = [
  {
    name: 'Бизнес и карьера',
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
    iconColor: 'rgba(238, 231, 247, 1)',
    // iconName: 'business', // удалить эту строку и раскомментировать iconName, когда будут готовы иконки
  },
  {
    name: 'Творчество и искусство',
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
    iconColor: 'rgba(247, 231, 242, 1)',
    // iconName: 'art', // удалить эту строку и раскомментировать iconName, когда будут готовы иконки
  },
  {
    name: 'Иностранные языки',
    subcategories: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)',
    ],
    iconColor: 'rgba(235, 229, 197, 1)',
    // iconName: 'language', // удалить эту строку и раскомментировать iconName, когда будут готовы иконки
  },
  {
    name: 'Образование и развитие',
    subcategories: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг',
    ],
    iconColor: 'rgba(231, 242, 246, 1)',
    // iconName: 'education', // удалить эту строку и раскомментировать iconName, когда будут готовы иконки
  },
  {
    name: 'Дом и уют',
    subcategories: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей',
    ],
    iconColor: 'rgba(247, 235, 229, 1)',
    // iconName: 'home', // удалить эту строку и раскомментировать iconName, когда будут готовы иконки
  },
  {
    name: 'Здоровье и лайфстайл',
    subcategories: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы',
    ],
    iconColor: 'rgba(233, 247, 231, 1)',
    // iconName: 'health', // удалить эту строку и раскомментировать iconName, когда будут готовы иконки
  },
]

const meta = {
  title: 'Widgets/CategoriesMenu',
  component: CategoriesMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof CategoriesMenu>

export default meta

export const Default: StoryObj = {
  args: {
    categories: mockCategories,
    onCategoryClick: (category: { name: string }) =>
      console.log('Category clicked:', category.name),
    onSubcategoryClick: (sub: string, category: { name: string }) =>
      console.log('Subcategory clicked:', sub, 'from', category.name),
  },
}
