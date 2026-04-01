import React, { memo, useEffect } from 'react'
import ReactDOM from 'react-dom'

import styles from './Modal.module.css'

type TModal = {
  children: React.ReactElement
  onClose: () => void
  paddingTop?: number
  paddingBottom?: number
}

/** Такая реализация modalRoot нужна для работы storybook */
let modalRoot = document.getElementById('modal') as Element
if (!modalRoot) {
  modalRoot = document.createElement('div')
  modalRoot.id = 'modal'
  document.body.appendChild(modalRoot)
}

export const Modal = memo((props: TModal) => {
  const { children, onClose, paddingTop = 62, paddingBottom = 62 } = props

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
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContainer}
        style={{ paddingTop, paddingBottom }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>,
    modalRoot
  )
})
