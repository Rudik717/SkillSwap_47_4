//import arrowIcon from '@/assets/svg/arrow-down.svg'
import { Icon } from '@/ui-kit'
import type { IconName } from '@/ui-kit'
import React from 'react'

import styles from './MenuButton.module.css'

interface MenuButtonProps {
  children?: string
  onPress?: () => void
  color?: string // цвет текста
  iconColor?: 'original' | 'black' | 'text' // управление цветом иконки
  iconName?: IconName
  style?: React.CSSProperties
}

export const MenuButton = ({
  children,
  onPress,
  color = '#000000',
  iconColor = 'black',
  iconName,
  style,
}: MenuButtonProps) => {
  const getIconColor = () => {
    if (iconColor === 'black') return '#000000'
    if (iconColor === 'text') return color
    return undefined
  }
  return (
    <button className={styles.button} onClick={onPress} style={{ color, ...style }}>
      <span className={styles.text}>{children}</span>
      <Icon name={iconName || 'arrow-down'} size={24} color={getIconColor()} />
    </button>
  )
}
