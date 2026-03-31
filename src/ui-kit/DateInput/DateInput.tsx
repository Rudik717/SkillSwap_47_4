import { ru } from 'date-fns/locale'
import React, { useRef } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '../Button/Button'
import { FormField } from '../FormField/FormField'
import { Icon } from '../Icon/Icon'
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
    const [openDropdown, setOpenDropdown] = useState<'month' | 'year' | null>(null)

    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('ru', { month: 'long' })
    )

    const currentYear = new Date().getFullYear()
    const minYear = currentYear - 100
    const years = Array.from({ length: 101 }, (_, i) => minYear + i)

    const yearListRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (openDropdown === 'year' && yearListRef.current) {
        const index = years.indexOf(date.getFullYear())
        const itemHeight = 32
        yearListRef.current.scrollTop = index * itemHeight - 64
      }
    }, [openDropdown])

    return (
      <div className={styles.header}>
        <div className={styles.dropdown}>
          <div
            className={`${styles.dropdownTrigger} ${openDropdown === 'month' ? styles.open : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'month' ? null : 'month')}
          >
            {months[date.getMonth()]}
            <Icon name="arrow-down" size={24} />
          </div>

          {openDropdown === 'month' && (
            <div className={styles.dropdownMenu}>
              {months.map((month, index) => (
                <div
                  key={month}
                  className={`${styles.dropdownItem} ${date.getMonth() === index ? 'selected' : ''}`}
                  onClick={() => {
                    changeMonth(index)
                    setOpenDropdown(null)
                  }}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.dropdown}>
          <div
            className={`${styles.dropdownTrigger} ${openDropdown === 'year' ? styles.open : ''}`}
            onClick={() => setOpenDropdown(openDropdown === 'year' ? null : 'year')}
          >
            {date.getFullYear()}
            <Icon name="arrow-down" size={24} />
          </div>

          {openDropdown === 'year' && (
            <div className={styles.dropdownMenu} ref={yearListRef}>
              {years.map((year) => (
                <div
                  key={year}
                  className={`${styles.dropdownItem} ${date.getFullYear() === year ? 'selected' : ''}`}
                  onClick={() => {
                    changeYear(year)
                    setOpenDropdown(null)
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
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
        onFocus={onClick}
        readOnly
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
          onInputClick={() => setOpen(true)}
          renderCustomHeader={({ date, changeMonth, changeYear }) => (
            <CustomHeader date={date} changeMonth={changeMonth} changeYear={changeYear} />
          )}
        />
      </div>
    </FormField>
  )
}
