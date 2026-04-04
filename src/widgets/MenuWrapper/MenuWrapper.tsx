import React, { useEffect, useRef } from 'react'

import styles from './MenuWrapper.module.css'

interface MenuWrapperProps {
  children: React.ReactNode
  /**
   * Ссылка на элемент-триггер (кнопку, иконку и т.д.), который открывает меню.
   * Используется для определения кликов вне меню - клик по триггеру не должен закрывать меню.
   */
  triggerRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
  onClose: () => void
  position?:
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right' /** Позиция меню относительно родительского элемента с `position: relative`*/
  className?: string
}

export const MenuWrapper: React.FC<MenuWrapperProps> = ({
  children,
  triggerRef,
  isOpen,
  onClose,
  position = 'top-right',
  className = '',
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        onClose()
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [triggerRef, isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      className={`${styles.menuWrapper} ${styles[position]} ${className}`}
      role="menu"
      aria-hidden={!isOpen}
    >
      {children}
    </div>
  )
}
