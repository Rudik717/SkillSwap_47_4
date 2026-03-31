import React, { memo, useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Modal.module.css'

type ModalPadding = 'primary' | 'secondary' | 'tertiary'

type TModal = {
  children: React.ReactElement
  onClose: () => void
  padding?: ModalPadding
}

/** Такая реализация modalRoot нужна для работы storybook */

let modalRoot = document.getElementById('modal') as Element
if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.id = 'modal'
  document.body.appendChild(modalRoot)
}

export const Modal = memo((props: TModal) => {
  const { children, onClose, padding = 'primary' } = props

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose()
    }

    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      <div
        className={`${styles.modal_container} ${styles[`padding-${padding}`]}`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>,
    modalRoot
  )
})
