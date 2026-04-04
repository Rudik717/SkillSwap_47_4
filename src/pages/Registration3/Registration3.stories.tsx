import type { Meta, StoryObj } from '@storybook/react-vite'

import { type RegisterDataSet, type TRegisterData } from '../../utils/types'
import { Registration3 } from './Registration3'

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
  render: () => <Registration3 />,
}
