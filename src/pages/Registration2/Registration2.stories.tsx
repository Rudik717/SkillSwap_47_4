import type { Meta, StoryObj } from '@storybook/react-vite'

import { type RegisterDataSet, type TRegisterData } from '../../utils/types'
import { Registration2 } from './Registration2'

type Story = StoryObj<typeof Registration2>

const meta: Meta<typeof Registration2> = {
  title: 'Pages/Registration2',
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

export const WithPrefilledData: Story = {
  args: {
    data: {
      email: '',
      password: '',
      name: '',
      birthDate: null,
      gender: 'unspecified',
      city: '',
      avatar: '',
      learnSkill: { type: 'learn', category: '', subcategory: '' },
      teachSkill: {
        type: 'teach',
        title: '',
        category: '',
        subcategory: '',
        description: '',
        images: [],
      },
    } as TRegisterData,
  } as RegisterDataSet,
  render: () => <Registration2 />,
}
