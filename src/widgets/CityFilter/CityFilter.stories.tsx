import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { CityFilter } from './CityFilter'

export const CITY_ROLE = [
  { label: 'Москва', value: 'Moscow' },
  { label: 'Санкт-Петербург', value: 'Saint-Petersburg' },
  { label: 'Новосибирск', value: 'Novosibirsk' },
  { label: 'Екатеринбург', value: 'Yekaterinburg' },
  { label: 'Казань', value: 'Kazan' },
  { label: 'Нижний Новгород', value: 'Nizhny-Novgorod' },
  { label: 'Челябинск', value: 'Chelyabinsk' },
  { label: 'Самара', value: 'Samara' },
  { label: 'Омск', value: 'Omsk' },
  { label: 'Ростов-на-Дону', value: 'Rostov-on-Don' },
  { label: 'Уфа', value: 'Ufa' },
  { label: 'Красноярск', value: 'Krasnoyarsk' },
  { label: 'Воронеж', value: 'Voronezh' },
  { label: 'Пермь', value: 'Perm' },
  { label: 'Волгоград', value: 'Volgograd' },
  { label: 'Краснодар', value: 'Krasnodar' },
  { label: 'Саратов', value: 'Saratov' },
  { label: 'Тюмень', value: 'Tyumen' },
  { label: 'Тольятти', value: 'Tolyatti' },
  { label: 'Ижевск', value: 'Izhevsk' },
  { label: 'Барнаул', value: 'Barnaul' },
  { label: 'Ульяновск', value: 'Ulyanovsk' },
  { label: 'Иркутск', value: 'Irkutsk' },
  { label: 'Хабаровск', value: 'Khabarovsk' },
  { label: 'Ярославль', value: 'Yaroslavl' },
  { label: 'Владивосток', value: 'Vladivostok' },
  { label: 'Махачкала', value: 'Makhachkala' },
  { label: 'Томск', value: 'Tomsk' },
  { label: 'Оренбург', value: 'Orenburg' },
  { label: 'Кемерово', value: 'Kemerovo' },
  { label: 'Новокузнецк', value: 'Novokuznetsk' },
  { label: 'Рязань', value: 'Ryazan' },
  { label: 'Астрахань', value: 'Astrakhan' },
  { label: 'Набережные Челны', value: 'Naberezhnye-Chelny' },
  { label: 'Пенза', value: 'Penza' },
  { label: 'Киров', value: 'Kirov' },
  { label: 'Липецк', value: 'Lipetsk' },
  { label: 'Чебоксары', value: 'Cheboksary' },
  { label: 'Калининград', value: 'Kaliningrad' },
  { label: 'Тула', value: 'Tula' },
  { label: 'Курск', value: 'Kursk' },
  { label: 'Ставрополь', value: 'Stavropol' },
  { label: 'Улан-Удэ', value: 'Ulan-Ude' },
  { label: 'Сочи', value: 'Sochi' },
  { label: 'Тверь', value: 'Tver' },
  { label: 'Магнитогорск', value: 'Magnitogorsk' },
  { label: 'Иваново', value: 'Ivanovo' },
  { label: 'Брянск', value: 'Bryansk' },
  { label: 'Белгород', value: 'Belgorod' },
  { label: 'Сургут', value: 'Surgut' },
]

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
