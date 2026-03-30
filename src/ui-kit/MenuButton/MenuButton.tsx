//import arrowIcon from '@/assets/svg/arrow-down.svg'
import styles from './MenuButton.module.css'

interface MenuButtonProps {
  children?: string
  onPress?: () => void
  color?: string // цвет текста
  iconColor?: 'original' | 'black' | 'text' // управление цветом иконки
  arrowIcon?: string
}

export const MenuButton = ({
  children,
  onPress,
  color = '#000000',
  iconColor = 'black',
  arrowIcon,
}: MenuButtonProps) => {
  const iconClass =
    iconColor === 'black'
      ? styles.iconBlack
      : iconColor === 'original'
        ? styles.iconOriginal
        : styles.iconText

  return (
    <button className={styles.button} onClick={onPress} style={{ color }}>
      <span className={styles.text}>{children}</span>
      <img src={arrowIcon} alt="" className={`${styles.icon} ${iconClass}`} />
    </button>
  )
}
