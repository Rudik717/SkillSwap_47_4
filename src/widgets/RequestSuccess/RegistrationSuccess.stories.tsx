import { useModal } from '@/widgets/Modal/useModal'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { RequestSuccess } from './RequestSuccess'

const meta: Meta<typeof RequestSuccess> = {
  title: 'widgets/RequestSuccess',
  component: RequestSuccess,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Модальное окно, отображаемое после успешного создания заявки на обмен (SkillDetails → "Предложить обмен").',
      },
    },
  },
  argTypes: {
    onClose: {
      action: 'closed',
      description: 'Обработчик закрытия модального окна',
    },
    onRedirect: {
      action: 'redirected',
      description: 'Callback для редиректа после закрытия (опционально)',
    },
  },
}

export default meta
type Story = StoryObj<typeof RequestSuccess>

const ModalDemo = () => {
  const { isModalOpen, openModal, closeModal } = useModal()

  const handleRedirect = () => {
    console.log('Редирект после создания заявки выполнен')
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
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
        Показать окно «Заявка на обмен отправлена»
      </button>

      {isModalOpen && <RequestSuccess onClose={closeModal} onRedirect={handleRedirect} />}
    </div>
  )
}

export const Primary: Story = {
  render: () => <ModalDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Интерактивная демонстрация модального окна успеха создания заявки на обмен.',
      },
    },
  },
}

export const Default: Story = {
  args: {
    onClose: () => console.log('Closed'),
    onRedirect: () => console.log('Redirect after request creation'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Дефолтный вид модалки (иконка bell, заголовок «Вы предложили обмен»).',
      },
    },
  },
}
