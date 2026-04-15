import type { TExchange } from './types'

export const loadExchanges = (): TExchange[] => {
  const data = localStorage.getItem('exchanges')

  if (!data) return []

  try {
    const parsed = JSON.parse(data)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveExchanges = (exchanges: TExchange[]) => {
  if (!Array.isArray(exchanges)) return

  try {
    localStorage.setItem('exchanges', JSON.stringify(exchanges))
  } catch {
    // ignore
  }
}
