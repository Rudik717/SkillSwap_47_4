import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrowserRouter } from 'react-router-dom'

import { ProfileMenu, menuItems } from './ProfileMenu'

const meta: Meta<typeof ProfileMenu> = {
  title: 'Widgets/ProfileMenu',
  component: ProfileMenu,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    selectedItem: {
      control: {
        type: 'select',
        options: menuItems.map((item) => item.id),
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof ProfileMenu>

// Базовый вариант
export const Default: Story = {
  args: {
    items: menuItems,
    selectedItem: 'userData',
  },
}
