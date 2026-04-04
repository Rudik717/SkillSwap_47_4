import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toast } from './Toast'

const meta = {
  title: 'Widgets/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>

export default meta

export const Default: StoryObj = {
  args: {
    message: 'Олег предлагает вам обмен',
    isVisible: true,
    onClose: () => console.log('Закрыть'),
  },
}
