import { mockStore } from '@/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'

import { GenderFilter } from './GenderFilter'

const meta = {
  title: 'Widgets/GenderFilter',
  component: GenderFilter,
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
} satisfies Meta<typeof GenderFilter>

export default meta

export const Default: StoryObj = {
  args: {
    name: 'gender',
  },
}
