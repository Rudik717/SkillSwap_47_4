import { useModal } from '@/widgets/Modal/useModal'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'

import { ExchangeOffer } from './ExchangeOffer'

const meta: Meta<typeof ExchangeOffer> = {
  title: 'Widgets/ExchangeOffer',
  component: ExchangeOffer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ExchangeOffer>

const ExchangeOfferWithHook = () => {
  const { isModalOpen, openModal, closeModal } = useModal()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <button
        onClick={openModal}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#ABD27A',
        }}
      >
        Предложить обмен
      </button>
      <ExchangeOffer isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export const Default: Story = {
  render: () => <ExchangeOfferWithHook />,
}

export const OpenModal: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
  },
}
