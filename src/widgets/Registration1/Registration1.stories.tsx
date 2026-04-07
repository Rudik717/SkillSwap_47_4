import type { Meta, StoryObj } from '@storybook/react-vite'

import { type RegisterDataSet, type TRegisterData } from '../../utils/types'
import { Registration1 } from './Registration1'

type Story = StoryObj<typeof Registration1>

const meta: Meta<typeof Registration1> = {
  title: 'Widgets/Registration1',
  component: Registration1,
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

// Создаём моковую функцию setData
const mockSetData = (newData: TRegisterData) => {
  console.log('setData called with:', newData)
}

// Создаём моковые функции для навигации
const mockNextStep = () => {
  console.log('nextStep called')
}

export const Default: Story = {
  args: {
    data: {
      id: '',
      email: '',
      password: '',
    } as TRegisterData,
    setData: mockSetData,
    nextStep: mockNextStep,
  } as RegisterDataSet,
  render: (args) => <Registration1 {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Форма с email и паролем',
      },
    },
  },
}
