import { mockStore } from '@/utils/store'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'

import { RoleFilter } from './RoleFilter'

const meta: Meta<typeof RoleFilter> = {
  title: 'Widgets/RoleFilter',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <div style={{ width: '324px' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
  component: RoleFilter,
}

export default meta

type Story = StoryObj<typeof RoleFilter>

export const Default: Story = {
  args: {
    onChange: () => {},
  },
}
