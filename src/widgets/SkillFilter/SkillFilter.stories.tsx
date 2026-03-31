import type { Meta, StoryObj } from '@storybook/react-vite'

import { SkillFilter } from './SkillFilter'
import type { Group } from './SkillFilter'

const mockData: Group[] = [
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
]

const meta: Meta<typeof SkillFilter> = {
  title: 'Widgets/SkillFilter',
  component: SkillFilter,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Массив групп навыков для отображения',
    },
    value: {
      control: 'object',
      description: 'Выбранные ID навыков',
    },
    onChange: {
      action: 'skill selected',
      description: 'Обработчик выбора навыка',
    },
  },
  args: {
    options: mockData,
  },
}

export default meta
type Story = StoryObj<typeof SkillFilter>

// Базовая история — все группы свернуты
export const FewGroups: Story = {
  args: {
    options: mockData,
  },
}
