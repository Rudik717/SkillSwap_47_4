import ReactSelect, { components } from 'react-select'

import { Checkbox } from '../Checkbox/Checkbox'
import { FormField } from '../FormField/FormField'
import { Icon } from '../Icon/Icon'
import styles from './Select.module.css'

type Option = {
  label: string
  value: string
}

type SelectProps = {
  label?: string
  value?: Option | Option[] | null
  onChange?: (option: Option | Option[] | null) => void
  options?: Option[]
  error?: string
  info?: string
  name?: string
  placeholder?: string
  isSearchable?: boolean
  isMulti?: boolean
}

// Стрелка вниз
const CustomDropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <Icon name="arrow-down" size={24} color="#253017" />
  </components.DropdownIndicator>
)

// Крестик для очистки
const CustomClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <Icon name="cross" size={24} color="#253017" />
  </components.ClearIndicator>
)

// Option с чекбоксом для мультивыбора
const CheckboxOption = (props: any) => {
  const { innerProps, isSelected, label } = props

  return (
    <components.Option {...props}>
      <Checkbox state={isSelected ? 'checked' : 'unchecked'} onClick={innerProps.onClick}>
        {label}
      </Checkbox>
    </components.Option>
  )
}

export const Select = ({
  label,
  value,
  onChange,
  options = [],
  error,
  info,
  name,
  placeholder = '',
  isSearchable = false,
  isMulti = false,
}: SelectProps) => {
  const selectComponents: any = {
    DropdownIndicator: CustomDropdownIndicator,
    ClearIndicator: CustomClearIndicator,
  }

  if (isMulti) {
    selectComponents.Option = CheckboxOption
  }

  return (
    <FormField label={label} error={error} info={info}>
      <div className={`${styles.selectWrapper} ${error ? styles.error : ''}`}>
        <ReactSelect
          name={name}
          value={value}
          onChange={(option) => onChange?.(option as Option | Option[] | null)}
          options={options}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable
          isMulti={isMulti}
          classNamePrefix="select"
          components={selectComponents}
        />
      </div>
    </FormField>
  )
}
