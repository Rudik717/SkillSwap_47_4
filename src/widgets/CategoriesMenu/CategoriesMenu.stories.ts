import { mockStore } from '@/utils/store'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { Provider } from 'react-redux'
import { action } from 'storybook/actions'

import { CategoriesMenu } from './CategoriesMenu'

const meta: Meta<typeof CategoriesMenu> = {
  title: 'Widgets/CategoriesMenu',
  component: CategoriesMenu,
  tags: ['autodocs'],
  decorators: [
    (Story) =>
      React.createElement(Provider, {
        store: mockStore,
        children: React.createElement(Story),
      }),
  ],
}

export default meta

export const Default: StoryObj<typeof CategoriesMenu> = {
  args: {
    onCategoryClick: action('category clicked'),
    onSubcategoryClick: action('subcategory clicked'),
  },
}
