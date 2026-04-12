import { configureStore } from '@reduxjs/toolkit'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Provider } from 'react-redux'

import { data as categories } from '../../../mock/api/categories'
import { data as cities } from '../../../mock/api/cities'
import { type TRegisterData } from '../../utils/types'
import { Registration2 } from './Registration2'

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

type Story = StoryObj<typeof Registration2>

const meta: Meta<typeof Registration2> = {
  title: 'Widgets/Registration2',
  component: Registration2,
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
      email: '',
      password: '',
      name: '',
      birthDate: null,
      gender: 'unspecified',
      city: '',
      avatar: '',
      skills: [
        {
          type: 'learn',
          category: '',
          subcategory: '',
        },
      ],
    } as TRegisterData,
  },
  render: (args) => {
    const [data, setData] = useState<TRegisterData>(args.data)

    return (
      <Provider store={store}>
        <Registration2
          data={data}
          setData={setData}
          nextStep={() => console.log('Next step triggered')}
          prevStep={() => console.log('Previous step triggered')}
        />
      </Provider>
    )
  },
}
