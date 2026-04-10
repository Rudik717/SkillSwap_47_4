import React, { type ElementType } from 'react'

import styles from './Text.module.css'

export type TextVariant = 'H1' | 'H2' | 'H3' | 'H4' | 'Body' | 'Caption' | 'Toast'

interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
  color?: string
  as?: ElementType
  style?: React.CSSProperties // Дополнительные CSS-свойства
  className?: string // Дополнительные классы CSS
}

export const Text = ({
  children,
  variant = 'Body',
  color,
  as,
  style: customStyle,
  className,
}: TextProps) => {
  // Определяем тег, который будет использоваться для рендеринга
  const getTagVariant = (tag: TextVariant): ElementType => {
    switch (tag) {
      case 'H1':
        return 'h1'
      case 'H2':
        return 'h2'
      case 'H3':
        return 'h3'
      case 'H4':
        return 'h4'
      case 'Caption':
        return 'p'
      case 'Toast':
        return 'p'
      default:
        return 'p'
    }
  }

  const TagElement = as ?? getTagVariant(variant)

  // Корректное объединение классов: берём базовый класс из CSS-модулей, добавляем пользовательский className
  const baseClassName = styles[variant] || ''
  const mergedClassName = [baseClassName, className].filter(Boolean).join(' ')

  // Объединение стилей: приоритет — цвет (если задан), затем кастомные стили
  const colorStyle: React.CSSProperties | undefined = color ? { color } : undefined
  const mergedStyles = {
    ...colorStyle,
    ...customStyle,
  }

  return (
    <TagElement className={mergedClassName} style={mergedStyles}>
      {children}
    </TagElement>
  )
}
