import { ru } from 'date-fns/locale'
import React from 'react'
import { forwardRef, useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../Button/Button'
import { FormField } from '../FormField/FormField'
import { Icon } from '../Icon/Icon'
import { Select } from '../Select/Select'
import styles from './DateInput.module.css'

registerLocale('ru', ru)

type Props = {
  id?: string
  label?: string
  value?: Date | null
  onChange?: (date: Date | null) => void
  error?: string
  info?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
  placeholder?: string
}

export const DateInput = ({
  id,
  label,
  value,
  onChange,
  error,
  info,
  disabled = false,
  minDate,
  maxDate,
  placeholder = 'дд.мм.гггг',
}: Props) => {
  const [tempDate, setTempDate] = useState<Date | null>(value ?? null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setTempDate(value ?? null)
  }, [value])

  // Кастомный header
  const CustomHeader = ({
    date,
    changeMonth,
    changeYear,
  }: {
    date: Date
    changeMonth: (month: number) => void
    changeYear: (year: number) => void
  }) => {
    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
      label: new Date(0, i).toLocaleString('ru', { month: 'long' }),
      value: i.toString(),
    }))

    const yearOptions = Array.from({ length: 10 }, (_, i) => {
      const year = new Date().getFullYear() - 5 + i
      return { label: year.toString(), value: year.toString() }
    })

    return (
      <div className={styles.header}>
        <Select
          value={monthOptions[date.getMonth()]}
          onChange={(option) => {
            if (!option || Array.isArray(option)) return
            changeMonth(Number(option.value))
          }}
          options={monthOptions}
          isSearchable={false}
        />

        <Select
          value={yearOptions.find((y) => y.value === date.getFullYear().toString()) ?? null}
          onChange={(option) => {
            if (!option || Array.isArray(option)) return
            changeYear(Number(option.value))
          }}
          options={yearOptions}
          isSearchable={false}
        />
      </div>
    )
  }

  // Кастомный input с иконкой
  const CalendarInput = forwardRef<
    HTMLInputElement,
    {
      value?: string
      onClick?: () => void
      placeholder?: string
    }
  >(({ value, onClick, placeholder }, ref) => (
    <div className={styles.inputWrapper} onClick={onClick}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={styles.input}
        ref={ref}
        readOnly
        onFocus={onClick}
      />

      <Icon name="calendar" size={24} color={'#253017'} />
    </div>
  ))

  // Кастомный футер календаря
  const CustomContainer = ({
    className,
    children,
  }: {
    className?: string
    children: React.ReactNode
  }) => (
    <div className={`${className} ${styles.calendar}`}>
      {children}
      <div className={styles.footer}>
        <Button
          variant="secondary"
          onClick={() => {
            setTempDate(value ?? null)
            setOpen(false)
          }}
        >
          Отменить
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            onChange?.(tempDate ?? null)
            setOpen(false)
          }}
        >
          Выбрать
        </Button>
      </div>
    </div>
  )

  return (
    <FormField id={id} label={label} error={error} info={info}>
      <div className={styles.wrapper}>
        <ReactDatePicker
          id={id}
          selected={tempDate}
          onChange={(date: Date | null) => setTempDate(date)}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholder}
          disabled={disabled}
          calendarClassName={styles.calendar}
          wrapperClassName={styles.datepickerWrapper}
          popperPlacement="bottom-start"
          dateFormat="dd.MM.yyyy"
          locale="ru"
          calendarContainer={CustomContainer}
          customInput={<CalendarInput />}
          open={open}
          onClickOutside={() => setOpen(false)}
          onSelect={() => {}}
          onInputClick={() => setOpen(true)}
          renderCustomHeader={({ date, changeMonth, changeYear }) => (
            <CustomHeader date={date} changeMonth={changeMonth} changeYear={changeYear} />
          )}
        />
      </div>
    </FormField>
  )
}
