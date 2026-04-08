// Хранилище accessToken - будет храниться в памяти - в переменной

let accessToken: string | null = null

// получить accessToken
export const getAccessToken = () => {
  return accessToken
}

// установить accessToken
export const setAccessToken = (token: string | null) => {
  accessToken = token
}

// удалить accessToken
export const deleteAccessToken = () => {
  accessToken = null
}
