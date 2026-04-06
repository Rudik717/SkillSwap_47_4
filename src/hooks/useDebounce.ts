import { useEffect, useRef } from 'react'

type Timer = ReturnType<typeof setTimeout>
type Func = (...args: any[]) => void

export const useDebounce = (func: Func, delay = 500) => {
  const timer = useRef<Timer>(null)

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunc = (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      func(...args)
    }, delay)
  }
  return debouncedFunc
}
