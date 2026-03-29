import React, { useState } from 'react'

import styles from './RadioGroup.module.css'

/**TODO: Перенести константы в отдельный файл */
/*
const OPTIONS_GENDER = [
  {
    label: 'Не имеет значения',
    value: 'default',
  },
  {
    label: 'Мужской',
    value: 'male',
  },
  {
    label: 'Женский',
    value: 'female',
  },
]

const OPTIONS_ROLE = [
  {
    label: 'Всё',
    value: 'default',
  },
  {
    label: 'Хочу научиться',
    value: 'want-to-learn',
  },
  {
    label: 'Могу научить',
    value: 'can-teach',
  },
]
*/
type OptionType = {
  label: string
  value: string
}

type OptionProps = {
  label: OptionType['label']
  value: OptionType['value']
  groupName: string
  checked: boolean
  onChange: (value: string) => void
}

const Option = (props: OptionProps): React.ReactNode => {
  const { label, value, groupName, checked, onChange } = props

  const handleChange = () => onChange(value)

  const inputId = `${groupName}_radio_item_value__${value}`

  return (
    <div className={styles.item} key={value}>
      <input
        id={inputId}
        type="radio"
        name={groupName}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
    </div>
  )
}

type RadioGroupsProps = {
  name: string
  options: OptionType[]
  onChange: (value: string) => void
}

export const RadioGroup = (props: RadioGroupsProps): React.ReactNode => {
  const { name, options, onChange } = props

  // Устанавливаем первый элемент как выбранный по умолчанию
  const [selectedInput, setSelectedInput] = useState(options[0]?.value ?? '')

  const handleChange = (value: string) => {
    setSelectedInput(value)
    onChange(value)
  }

  return (
    <div className={styles.group}>
      {options.map(({ label, value }) => (
        <Option
          key={value}
          groupName={name}
          value={value}
          label={label}
          checked={selectedInput === value}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
