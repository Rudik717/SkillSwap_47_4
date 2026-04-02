import { mockStore } from '@/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'

import { UsersGrid } from './UsersGrid'

// Минимальные мок-данные (только то, что нужно для отображения)
const mockUsers = [
  {
    id: '1',
    name: 'Анна',
    avatar: 'https://cataas.com/cat',
    city: 'Москва',
    birthDate: '1990-01-01',
    skills: [
      {
        id: 's1',
        userId: '1',
        type: 'teach',
        category: 'React',
        subcategory: 'Frontend',
        title: 'React',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 's2',
        userId: '1',
        type: 'learn',
        category: 'TypeScript',
        subcategory: 'Frontend',
        title: 'TypeScript',
        createdAt: '',
        updatedAt: '',
      },
    ],
    createdAt: '',
    updatedAt: '',
    email: '',
  },
  {
    id: '2',
    name: 'Иван',
    avatar: 'https://cataas.com/cat',
    city: 'СПб',
    birthDate: '1992-05-15',
    skills: [
      {
        id: 's3',
        userId: '2',
        type: 'teach',
        category: 'Vue',
        subcategory: 'Frontend',
        title: 'Vue',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 's4',
        userId: '2',
        type: 'learn',
        category: 'JavaScript',
        subcategory: 'Frontend',
        title: 'JavaScript',
        createdAt: '',
        updatedAt: '',
      },
    ],
    createdAt: '',
    updatedAt: '',
    email: '',
  },
  {
    id: '3',
    name: 'Мария',
    avatar: 'https://cataas.com/cat',
    city: 'Казань',
    birthDate: '1988-12-10',
    skills: [
      {
        id: 's5',
        userId: '3',
        type: 'teach',
        category: 'Python',
        subcategory: 'Backend',
        title: 'Python',
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 's6',
        userId: '3',
        type: 'learn',
        category: 'Django',
        subcategory: 'Backend',
        title: 'Django',
        createdAt: '',
        updatedAt: '',
      },
    ],
    createdAt: '',
    updatedAt: '',
    email: '',
  },
]

const meta: Meta<typeof UsersGrid> = {
  title: 'Widgets/UsersGrid',
  component: UsersGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div style={{}}>
          <Story />
        </div>
      </Provider>
    ),
  ],
}

export default meta

export const Default: StoryObj = {
  args: {
    users: mockUsers,
    title: 'Популярные пользователи',
    columns: 3,
  },
}

export const WithButton: StoryObj = {
  args: {
    users: mockUsers.slice(0, 3),
    title: 'Рекомендации',
    button: {
      label: 'Показать ещё',
      onClick: () => console.log('Load more'),
    },
    columns: 3,
  },
}
