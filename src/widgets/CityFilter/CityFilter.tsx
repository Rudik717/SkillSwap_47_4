import { useState } from 'react'

import { Checkbox } from '@ui-kit/Checkbox/Checkbox'
import { MenuButton } from '@ui-kit/MenuButton/MenuButton'
import { Text } from '@ui-kit/Text/Text'

import styles from './CityFilter.module.css'

interface CityFilterProps {
  options: { label: string; value: string }[]
  selectedCityList: string[]
  onChange: (value: string[]) => void
}

export const CityFilter = ({ options, selectedCityList = [], onChange }: CityFilterProps) => {
  const [showAllCityList, setShowAllCityList] = useState(false)
  const displayedCityList = showAllCityList ? options : options.slice(0, 5)

  const handleCityListToggle = (value: string) => {
    const newSelectedCityList = selectedCityList.includes(value)
      ? selectedCityList.filter((c) => c !== value)
      : [...selectedCityList, value]
    onChange(newSelectedCityList)
  }

  return (
    <div className={styles.cityFilterSection}>
      <Text variant="H3">Город</Text>
      <div className={styles.cityList}>
        {displayedCityList.map((city) => (
          <div className={styles.checkBoxContainer}>
            <Checkbox
              key={city.value}
              state={selectedCityList.includes(city.value) ? 'checked' : 'unchecked'}
              onClick={() => handleCityListToggle(city.value)}
              children={city.label}
            />
          </div>
        ))}
      </div>
      <div>
        <MenuButton
          iconName={showAllCityList ? 'arrow-up' : 'arrow-down'}
          onPress={() => setShowAllCityList(!showAllCityList)}
          color="#508826"
          iconColor="black"
        >
          {showAllCityList ? 'Свернуть' : 'Все города'}
        </MenuButton>
      </div>
    </div>
  )
}
