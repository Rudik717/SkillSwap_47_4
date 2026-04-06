import type { Meta, StoryObj } from '@storybook/react-vite'

import { type RegisterDataSet, type TRegisterData } from '../../utils/types'
import { Registration1 } from './Registration1'

type Story = StoryObj<typeof Registration1>

const meta: Meta<typeof Registration1> = {
  title: 'Pages/Registration1',
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

export const WithPrefilledData: Story = {
  args: {
    data: {
      email: 'user@example.com',
      password: '',
      name: '',
      birthDate: null,
      gender: 'unspecified',
      city: '',
      avatar: '',
      learnSkill: { category: '', subcategory: '' },
      teachSkill: {
        title: '',
        category: '',
        subcategory: '',
        description: '',
        images: [],
      },
    } as TRegisterData,
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
