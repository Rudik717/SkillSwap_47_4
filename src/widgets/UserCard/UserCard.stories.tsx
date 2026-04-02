import { mockStore } from '@/utils/store'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'

import '../../index.css'
import { UserCard } from './UserCard'

const meta: Meta<typeof UserCard> = {
  title: 'Widgets/UserCard',
  component: UserCard,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div style={{ width: '324px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Карточка пользователя для отображения в каталоге. Показывает аватар, имя, город, возраст, навыки "Может научить" и "Хочет научиться".',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof UserCard>

export const Default: Story = {
  args: {
    user: {
      id: '1',
      name: 'Иван',
      email: 'ivan@example.com',
      city: 'Санкт-Петербург',
      birthDate: '1990-05-15',
      avatar: '',
      about: '',
      skills: [
        {
          id: '1',
          userId: '1',
          title: 'Английский язык',
          type: 'teach',
          category: 'Иностранные языки',
          subcategory: 'Разговорный',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '2',
          userId: '1',
          title: 'Тайм менеджмент',
          type: 'learn',
          category: 'Бизнес и карьера',
          subcategory: 'Управление временем',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '3',
          userId: '1',
          title: 'Медитация',
          type: 'learn',
          category: 'Здоровье и лайфстайл',
          subcategory: 'Медитация',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '4',
          userId: '1',
          title: 'Рисование',
          type: 'learn',
          category: 'Творчество и искусство',
          subcategory: 'Рисование',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
      ],
      createdAt: '2025-01-15T10:30:00Z',
      updatedAt: '2025-03-30T15:20:00Z',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пользователь Иван: 34 года, Санкт-Петербург. Учит английскому, хочет научиться тайм-менеджменту, медитации и рисованию.',
      },
    },
  },
}

export const WithAvatar: Story = {
  args: {
    user: {
      id: '2',
      name: 'Екатерина',
      email: 'ekaterina@example.com',
      city: 'Казань',
      birthDate: '1988-11-25',
      avatar: 'https://i.pinimg.com/736x/b0/c7/18/b0c718ecc29d686e05d5f858f9ef79bb.jpg',
      about: 'Дизайнер, люблю создавать красивые интерфейсы',
      skills: [
        {
          id: '5',
          userId: '2',
          title: 'UI/UX Дизайн',
          type: 'teach',
          category: 'Творчество и искусство',
          subcategory: 'Дизайн',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '6',
          userId: '2',
          title: 'Figma',
          type: 'teach',
          category: 'Творчество и искусство',
          subcategory: 'Инструменты',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '7',
          userId: '2',
          title: 'Английский язык',
          type: 'learn',
          category: 'Иностранные языки',
          subcategory: 'Разговорный',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
      ],
      createdAt: '2025-01-15T10:30:00Z',
      updatedAt: '2025-03-30T15:20:00Z',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пользователь Екатерина: с аватаркой, учит UI/UX дизайну и Figma, хочет выучить английский.',
      },
    },
  },
}

export const WithoutSkills: Story = {
  args: {
    user: {
      id: '3',
      name: 'Мария',
      email: 'maria@example.com',
      city: 'Москва',
      birthDate: '1995-03-20',
      avatar: '',
      about: '',
      skills: [],
      createdAt: '2025-02-01T10:30:00Z',
      updatedAt: '2025-02-01T10:30:00Z',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пользователь без навыков. Секции "Может научить" и "Хочет научиться" не отображаются.',
      },
    },
  },
}

export const ManySkills: Story = {
  args: {
    user: {
      id: '4',
      name: 'Дмитрий',
      email: 'dmitry@example.com',
      city: 'Новосибирск',
      birthDate: '1992-08-10',
      avatar: '',
      about: 'Фулстек разработчик',
      skills: [
        {
          id: '8',
          userId: '4',
          title: 'React',
          type: 'teach',
          category: 'Бизнес и карьера',
          subcategory: 'Программирование',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '9',
          userId: '4',
          title: 'TypeScript',
          type: 'teach',
          category: 'Бизнес и карьера',
          subcategory: 'Программирование',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '10',
          userId: '4',
          title: 'Python',
          type: 'learn',
          category: 'Бизнес и карьера',
          subcategory: 'Программирование',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '11',
          userId: '4',
          title: 'Йога',
          type: 'learn',
          category: 'Здоровье и лайфстайл',
          subcategory: 'Йога',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '12',
          userId: '4',
          title: 'Медитация',
          type: 'learn',
          category: 'Здоровье и лайфстайл',
          subcategory: 'Медитация',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '13',
          userId: '4',
          title: 'Фотография',
          type: 'learn',
          category: 'Творчество и искусство',
          subcategory: 'Фотография',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
        {
          id: '14',
          userId: '4',
          title: 'Английский язык',
          type: 'learn',
          category: 'Иностранные языки',
          subcategory: 'Разговорный',
          createdAt: '2025-01-15T10:30:00Z',
          updatedAt: '2025-01-15T10:30:00Z',
        },
      ],
      createdAt: '2025-01-15T10:30:00Z',
      updatedAt: '2025-03-30T15:20:00Z',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пользователь с большим количеством навыков. В секции "Хочет научиться" отображается +5.',
      },
    },
  },
}
