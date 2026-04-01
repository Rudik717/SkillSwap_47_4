import type { Meta, StoryObj } from '@storybook/react-vite'

import { RoleFilter } from './RoleFilter'

const meta: Meta<typeof RoleFilter> = {
  title: 'Widgets/RoleFilter',
  tags: ['autodocs'],
  component: RoleFilter,
}

export default meta

type Story = StoryObj<typeof RoleFilter>

export const Default: Story = {
  args: {
    onChange: () => {},
  },
}
