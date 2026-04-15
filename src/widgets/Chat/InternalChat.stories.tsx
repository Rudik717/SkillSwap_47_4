import type { Meta, StoryObj } from '@storybook/react-vite'

import { InternalChat } from './InternalChat'

const meta: Meta<typeof InternalChat> = {
  title: 'Widgets/Chat',
  component: InternalChat,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof InternalChat>
export const Default: Story = {}
