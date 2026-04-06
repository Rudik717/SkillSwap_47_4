import { configureStore } from '@reduxjs/toolkit'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { data as categories } from '../../../mock/api/categories'
import { data as cities } from '../../../mock/api/cities'
import { type TRegisterData } from '../../utils/types'
import { Registration3 } from './Registration3'

// Тестовое хранилище с нужным срезом состояния
const store = configureStore({
  reducer: {
    cities: (state = { cities: cities.cities, loading: false }) => state,
    categories: (
      state = {
        categories: categories.categories,
        subcategories: categories.subcategories,
      }
    ) => state,
  },
})

type Story = StoryObj<typeof Registration3>

const meta: Meta<typeof Registration3> = {
  title: 'Pages/Registration3',
  component: Registration3,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Данные регистрации',
    },
    setData: {
      action: 'setData called',
      description: 'Функция для обновления данных регистрации',
    },
    nextStep: {
      action: 'nextStep called',
      description: 'Переход к следующему шагу регистрации',
    },
    prevStep: {
      action: 'prevStep called',
      description: 'Возврат к предыдущему шагу регистрации',
    },
  },
}

export default meta

export const Default: Story = {
  args: {
    data: {
      id: '',
      name: '',
      email: '',
      password: '',
      birthDate: null,
      gender: '',
      city: '',
      avatar: '',
      skills: [
        {
          id: '',
          userId: '',
          type: 'learn', /// будто уже есть данные с предыдущего этапа регистрации
          category: '1',
          subcategory: '1-1',
          title: '',
          description: '',
          images: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    } as TRegisterData,
  },
  render: (args) => {
    const [data, setData] = useState<TRegisterData>(args.data)

    return (
      <Provider store={store}>
        <Registration3
          data={data}
          setData={setData}
          nextStep={() => console.log('Next step triggered')}
          prevStep={() => console.log('Previous step triggered')}
        />
      </Provider>
    )
  },
}
