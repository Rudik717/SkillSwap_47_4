import { useModal } from '@/widgets/Modal/useModal'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { RegistrationSuccess } from './RegistrationSuccess'

const meta: Meta<typeof RegistrationSuccess> = {
  title: 'widgets/RegistrationSuccess',
  component: RegistrationSuccess,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Модальное окно, отображаемое после успешной регистрации или создания навыка "Могу научить".',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['registration', 'creation'],
      description: 'Вариант отображения: регистрация (user-circle) или создание навыка (done)',
    },
    onClose: {
      action: 'closed',
      description: 'Обработчик закрытия модального окна',
    },
    onRedirect: {
      action: 'redirected',
      description: 'Callback для редиректа после закрытия',
    },
  },
}

export default meta
type Story = StoryObj<typeof RegistrationSuccess>

const ModalDemo = () => {
  const { isModalOpen, openModal, closeModal } = useModal()
  const [variant, setVariant] = useState<'registration' | 'creation'>('creation')

  const handleRedirect = () => {
    console.log('Редирект выполнен')
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => setVariant('creation')}
          style={{
            padding: '8px 16px',
            backgroundColor: variant === 'creation' ? 'rgb(171, 210, 122)' : '#ccc',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Создание навыка (done)
        </button>
        <button
          onClick={() => setVariant('registration')}
          style={{
            padding: '8px 16px',
            backgroundColor: variant === 'registration' ? 'rgb(171, 210, 122)' : '#ccc',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Регистрация (user-circle)
        </button>
      </div>
      <button
        onClick={openModal}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: 'rgb(171, 210, 122)',
          border: 'none',
          borderRadius: '12px',
        }}
      >
        Показать окно
      </button>
      {isModalOpen && (
        <RegistrationSuccess variant={variant} onClose={closeModal} onRedirect={handleRedirect} />
      )}
    </div>
  )
}

export const Primary: Story = {
  render: () => <ModalDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Интерактивная демонстрация модального окна. Можно переключать варианты "регистрация" (user-circle) и "создание навыка" (done).',
      },
    },
  },
}

export const CreationVariant: Story = {
  args: {
    variant: 'creation',
    onClose: () => console.log('Closed'),
    onRedirect: () => console.log('Redirect to SkillsDetails'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Вариант для создания навыка "Могу научить" (иконка done).',
      },
    },
  },
}

export const RegistrationVariant: Story = {
  args: {
    variant: 'registration',
    onClose: () => console.log('Closed'),
    onRedirect: () => console.log('Redirect after registration'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Вариант для успешной регистрации пользователя (иконка user-circle).',
      },
    },
  },
}
