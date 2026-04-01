import type { Meta, StoryObj } from '@storybook/react-vite'

import { Modal } from './Modal'
import { useModal } from './useModal'

const meta: Meta<typeof Modal> = {
  title: 'Widgets/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    paddingTop: {
      control: {
        type: 'number',
      },
      description: 'Отступ сверху',
    },
    paddingBottom: {
      control: {
        type: 'number',
      },
      description: 'Отступ снизу',
    },
    onClose: {
      action: 'onClose',
      description: 'Обработчик закрытия модального окна',
    },
    children: {
      description: 'Содержимое модального окна',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Модальное окно с настраиваемыми паддингами. Использует createPortal для рендера в modalRoot.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

// Вспомогательный компонент для демонстрации содержимого
const ModalContent = ({ title }: { title: string }) => (
  <div style={{ width: '556px', height: '420px', backgroundColor: 'rgb(165, 207, 134)' }}>
    <h2>{title}</h2>
    <p>Здесь может быть любой React‑элемент.</p>
  </div>
)

export const Primary: Story = {
  args: {
    children: <ModalContent title="Модальное окно" />,
    onClose: () => console.log('Modal closed'),
  },
  render: (args) => {
    const { isModalOpen, openModal, closeModal } = useModal()
    return (
      <div>
        <button onClick={openModal}>Открыть модальное окно (primary)</button>
        {isModalOpen && <Modal {...args} onClose={closeModal} />}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Модальное окно с паддингом по умолчанию (primary).',
      },
    },
  },
}
