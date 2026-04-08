type TRequestWithCookie = {
  headers: {
    cookie?: string
  }
}

// Извлекает значение cookie по его имени из HTTP-запроса (для мок-сервера)
export const getCookieFromRequest = (req: TRequestWithCookie, name: string): string | undefined => {
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) return undefined

  const cookie = cookieHeader.split('; ').find((row: string) => row.startsWith(`${name}=`))

  return cookie?.split('=')[1]
}

// Кодирует строку в Base64
export const base64Encode = (str: string): string => {
  return Buffer.from(str).toString('base64')
}

// Декодирует строку из Base64
export const base64Decode = (str: string): string => {
  return Buffer.from(str, 'base64').toString('utf-8')
}

// Генерирует уникальный UUID (для refresh токенов) с использованием встроенного модуля crypto в Node.js
export const generateUUID = (): string => {
  return require('crypto').randomUUID()
}
