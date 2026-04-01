import { CITY_ROLE } from '@/store/filter'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { CityFilter } from './CityFilter'

const meta: Meta<typeof CityFilter> = {
  title: 'Widgets/CityFilter',
  tags: ['autodocs'],
  component: CityFilter,
}

export default meta

type Story = StoryObj<typeof CityFilter>

export const Default: Story = {
  args: {
    options: CITY_ROLE,
  },
  render: (args) => {
    const [selectedCityList, setSelectedCityList] = useState<string[]>([])

    return (
      <CityFilter {...args} selectedCityList={selectedCityList} onChange={setSelectedCityList} />
    )
  },
}
