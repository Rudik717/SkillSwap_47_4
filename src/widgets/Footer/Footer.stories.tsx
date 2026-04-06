import { mockStore } from '@/utils/store'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Widgets/Footer',
  component: Footer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Виджет подвала страницы, содержит логотип, ссылки на разделы и меню навыков',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
