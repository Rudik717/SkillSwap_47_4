export type TDecoderData = {
  userId: string
  email: string
  exp: number
}

// декодируем токен - получаем 2-ю часть с данными
export function decodeToken(token: string): TDecoderData | null {
  try {
    const parts = token.replace(/^Bearer\s+/i, '').split('.')
    if (parts.length !== 3) {
      return null
    }
    return JSON.parse(atob(parts[1]))
  } catch {
    return null
  }
}

// проверяем истекший токен или нет: false - действует true - токен истек
export function isTokenExpired(token: string): boolean {
  const decoderToken = decodeToken(token)
  if (!decoderToken) {
    return true
  }
  if (!decoderToken.exp) {
    return true
  }

  const now = Math.floor(Date.now() / 1000)

  if (decoderToken.exp < now) {
    return true
  } else {
    return false
  }
}
