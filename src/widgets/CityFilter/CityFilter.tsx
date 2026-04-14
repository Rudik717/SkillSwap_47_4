import { useState } from 'react'

import { Checkbox } from '@ui-kit/Checkbox/Checkbox'
import { MenuButton } from '@ui-kit/MenuButton/MenuButton'
import { Text } from '@ui-kit/Text/Text'

import styles from './CityFilter.module.css'

interface CityFilterProps {
  options: { label: string; value: string }[]
  selectedValues: string[]
  onClick: (value: string) => void
}

export const CityFilter = ({ options, selectedValues = [], onClick }: CityFilterProps) => {
  const [showAllCityList, setShowAllCityList] = useState(false)
  const displayedCityList = showAllCityList ? options : options.slice(0, 5)

  const handleCityListToggle = (value: string) => {
    onClick?.(value)
  }

  const checkboxState = (value: string) => {
    return selectedValues.includes(value) ? 'checked' : 'unchecked'
  }

  return (
    <div className={styles.cityFilterSection}>
      <Text variant="H3">Город</Text>

      <div className={styles.cityList}>
        {displayedCityList.map(({ value, label }) => (
          <div className={styles.checkBoxContainer} key={value}>
            <Checkbox
              state={checkboxState(value)}
              onClick={() => handleCityListToggle(value)}
              children={label}
            />
          </div>
        ))}
      </div>

      <div>
        <MenuButton
          iconName={showAllCityList ? 'arrow-up' : 'arrow-down'}
          onPress={() => setShowAllCityList(!showAllCityList)}
          color="var(--accent-color)"
          iconColor="black"
        >
          {showAllCityList ? 'Свернуть' : 'Все города'}
        </MenuButton>
      </div>
    </div>
  )
}
