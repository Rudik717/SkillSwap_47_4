// RegistrationPreview.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'

import type { TSkillFormData } from '@utils/types'

import { RegistrationPreview } from './RegistrationPreview'

const Images = [
  'https://i.pinimg.com/736x/18/13/63/1813631ee45a3612a6d9b4b116567a4b.jpg',
  'https://i.pinimg.com/736x/04/20/c4/0420c4d695e7f04aa9f769ee9dca0878.jpg',
  'https://i.pinimg.com/736x/ff/e3/2d/ffe32d8f5d5ca7fe2409ebfcd0fd9b28.jpg',
  'https://i.pinimg.com/1200x/cc/04/78/cc0478ece26a04406fa2e50272d93144.jpg',
  'https://i.pinimg.com/736x/d0/a3/07/d0a3075735394a68407a85ae0c1ceb38.jpg',
]

const meta: Meta<typeof RegistrationPreview> = {
  title: 'Pages/RegistrationPreview',
  component: RegistrationPreview,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof RegistrationPreview>

const mockData: TSkillFormData = {
  title: 'Игра на барабанах',
  category: 'Творчество и искусство',
  subcategory: 'Музыка и звук',
  description: `Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.`,
  images: [],
}

// Открытая модалка, без картинок, с описанием
export const OpenWithoutImages: Story = {
  args: {
    data: mockData,
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// Без описания и без картинок
export const WithoutDescriptionAndImages: Story = {
  args: {
    data: {
      ...mockData,
      description: undefined,
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// С 4 фото
export const WithFourImages: Story = {
  args: {
    data: {
      ...mockData,
      images: Images.slice(0, 4),
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// С 1 фото
export const WithSingleImage: Story = {
  args: {
    data: {
      ...mockData,
      images: Images.slice(0, 1),
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// С 2 фото
export const WithTwoImages: Story = {
  args: {
    data: {
      ...mockData,
      images: Images.slice(0, 2),
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// С 3 фото
export const WithThreeImages: Story = {
  args: {
    data: {
      ...mockData,
      images: Images.slice(0, 3),
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// С 5 фото
export const WithFiveImages: Story = {
  args: {
    data: {
      ...mockData,
      images: Images.slice(0, 5),
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}

// С длинным названием и описанием
export const LongContent: Story = {
  args: {
    data: {
      ...mockData,
      title: 'Очень длинное название навыка которое не помещается в одну строку',
      subcategory: 'Музыка и звук / Инструменты / Ударные / Барабаны',
      description: 'Это очень длинное описание навыка. ' + 'А '.repeat(250) + 'вот так.',
      images: Images.slice(0, 4),
    },
    isOpen: true,
    onEdit: () => {},
    onConfirm: () => {},
  },
}
