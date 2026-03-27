import { Icon } from '@/ui-kit'

import styles from './MenuButton.module.css'

interface MenuButtonProps {
  children: string
  onPress?: () => void
}

export const MenuButton = ({ children, onPress }: MenuButtonProps) => {
  return (
    <button className={styles.button} onClick={onPress}>
      <span className={styles.text}>{children}</span>
      {/* FIXME: иконка arrow-down имеет серую обводку, которая не меняется через color. Если нужно чёрную — требуется заменить SVG на версию с currentColor */}
      <Icon name="arrow-down" size={24} color="black" />
    </button>
  )
}
