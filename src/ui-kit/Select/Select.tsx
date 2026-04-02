import ReactSelect, { components } from 'react-select'

import { Checkbox } from '../Checkbox/Checkbox'
import { FormField } from '../FormField/FormField'
import { Icon } from '../Icon/Icon'
import styles from './Select.module.css'

export type Option = {
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
const CustomClearIndicator = (props: any) => {
  const { inputValue } = props.selectProps

  if (!inputValue) return null

  return (
    <components.ClearIndicator {...props}>
      <Icon name="cross" size={24} color="#253017" />
    </components.ClearIndicator>
  )
}

// Option с чекбоксом
const ValueContainer = ({ children, ...props }: any) => {
  const selected = props.selectProps.value
  const count = Array.isArray(selected) ? selected.length : 0

  return (
    <components.ValueContainer {...props}>
      {count > 0 ? <div className={styles.multiValueLabel}>Выбрано: {count}</div> : children}
    </components.ValueContainer>
  )
}

const CheckboxOption = (props: any) => {
  const { isSelected, label } = props

  return (
    <components.Option {...props} className={styles.checkboxOption}>
      <Checkbox state={isSelected ? 'checked' : 'unchecked'}>{label}</Checkbox>
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
  }

  if (isSearchable && !isMulti) {
    selectComponents.ClearIndicator = CustomClearIndicator
  }

  if (isMulti) {
    selectComponents.Option = CheckboxOption
    selectComponents.ValueContainer = ValueContainer
  }

  return (
    <FormField label={label} error={error} info={info}>
      <div className={`${styles.selectWrapper} ${error ? styles.error : ''}`}>
        <ReactSelect
          name={name}
          value={value}
          options={options}
          placeholder={placeholder}
          isSearchable={isSearchable}
          isClearable={isSearchable && !isMulti}
          isMulti={isMulti}
          closeMenuOnSelect={!isMulti}
          classNamePrefix="select"
          components={selectComponents}
          onChange={(option) => {
            onChange?.(option as Option | Option[] | null)
          }}
          hideSelectedOptions={false}
        />
      </div>
    </FormField>
  )
}
