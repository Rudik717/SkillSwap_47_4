import { mockStore } from '@/utils'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'

import { FilterPanel } from './FilterPanel'

const meta = {
  title: 'Widgets/FilterPanel',
  component: FilterPanel,
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
} satisfies Meta<typeof FilterPanel>

export default meta

export const Primary: StoryObj = {
  args: {},
}
