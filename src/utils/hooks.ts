import React, { useEffect } from 'react'

type UseOutsideClickParams = {
  ref: React.RefObject<HTMLElement | null>
  handler: () => void
}

export const useOutsideClick = ({ ref, handler }: UseOutsideClickParams) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current) return

      if (!ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, handler])
}
