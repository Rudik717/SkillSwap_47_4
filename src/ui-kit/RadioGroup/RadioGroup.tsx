import type { ReactNode } from 'react'

import styles from './RadioGroup.module.css'

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

const Option = (props: OptionProps): ReactNode => {
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
  value?: string
  options: OptionType[]
  onChange: (value: string) => void
}

export const RadioGroup = ({ name, value, options, onChange }: RadioGroupsProps): ReactNode => {
  const selectedValue = value ?? options[0]?.value

  const handleChange = (value: string) => {
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
          checked={selectedValue === value}
          onChange={handleChange}
        />
      ))}
    </div>
  )
}
