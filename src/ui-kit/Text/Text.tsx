import React, { type ElementType } from 'react'

import styles from './Text.module.css'

export type TextVariant = 'H1' | 'H2' | 'H3' | 'H4' | 'Body' | 'Caption'

interface TextProps {
  children: React.ReactNode
  variant?: TextVariant
  color?: string
  as?: ElementType
}

export const Text = ({ children, variant = 'Body', color, as }: TextProps) => {
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
      default:
        return 'p'
    }
  }

  const TagElement = as ?? getTagVariant(variant)

  const baseClassName = styles[variant] || ''

  const colorType = (): React.CSSProperties => {
    return { color: color }
  }

  const colorStyle: React.CSSProperties | undefined = color ? colorType() : undefined

  return (
    <TagElement className={baseClassName} style={colorStyle}>
      {children}
    </TagElement>
  )
}
