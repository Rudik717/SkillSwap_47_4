// RegistrationPreview.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { TSkillFormData } from '@utils/types'

import { RegistrationPreview } from './RegistrationPreview'

const meta: Meta<typeof RegistrationPreview> = {
  title: 'Pages/RegistrationPreview', // ← Pages, а не Pages/RegistrationPreview
  component: RegistrationPreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RegistrationPreview>

// Моковые данные
const mockData: TSkillFormData = {
  title: 'Игра на барабанах',
  category: 'Творчество и искусство',
  subcategory: 'Музыка и звук',
  description: `Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.`,
  images: [],
}

// Базовое состояние — открытая модалка
export const Open: Story = {
  args: {
    data: mockData,
    isOpen: true,
    onEdit: () => console.log('Редактировать'),
    onConfirm: () => console.log('Готово'),
  },
}

// Закрытая модалка
export const Closed: Story = {
  args: {
    data: mockData,
    isOpen: false,
    onEdit: () => console.log('Редактировать'),
    onConfirm: () => console.log('Готово'),
  },
}

// Без описания
export const NoDescription: Story = {
  args: {
    data: {
      ...mockData,
      description: undefined,
    },
    isOpen: true,
    onEdit: () => console.log('Редактировать'),
    onConfirm: () => console.log('Готово'),
  },
}

// С изображениями
export const WithImages: Story = {
  args: {
    data: {
      ...mockData,
      images: ['https://picsum.photos/200/150', 'https://picsum.photos/200/151'],
    },
    isOpen: true,
    onEdit: () => console.log('Редактировать'),
    onConfirm: () => console.log('Готово'),
  },
}
