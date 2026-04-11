import { type Dispatch, type SetStateAction } from 'react'

export type TCategory = {
  id: string
  name: string
  color: string
  icon: string
}

export type TSubcategory = {
  id: string
  name: string
  categoryId: string
}

export type TUser = {
  id: string // "1111"
  name: string // "Иван"
  email: string // "ivan@example.com"
  // password?: string // пароль - убрала - не должен хранить на клиенте
  birthDate?: string // "15.05.1990"
  gender?: 'male' | 'female' | 'unspecified' // "male"
  city?: string // "Санкт-Петербург"
  avatar?: string // "https://skillswap.ru/avatar_ivan.jpg"
  about?: string // "Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое."
  skills: TSkill[] // Все навыки пользователя (тип teach/learn различается полем type)
  createdAt: string // "2025-01-15T10:30:00Z"
  updatedAt: string // "2025-03-30T15:20:00Z"
  favorites?: string[] // Массив TSkill.id навыков, добавленных в избранное
  notifications?: TNotification[] // Массив уведомлений
  requests?: string[] // Массив пользователей, которым отправлен обмен
  likes?: number // Количество лайков (Популярные на главной)
}

export type TSkill = {
  id: string // "skill_1"
  userId: string // id из TUser - id пользователя, которому принадлежит этот навык
  type: 'teach' | 'learn' // // "Учу" или "Учусь"
  category: string // Название категории (из TCategory.name) — для отображения в карточке
  subcategory: string // Название подкатегории (из TSubcategory.name) — для отображения в карточке
  title: string // "Английский язык"
  description?: string // "Научу свободно говорить на английском"
  images?: string[] // ["english_course.jpg"]
  createdAt?: string // Дата создания навыка
  updatedAt?: string // Дата последнего обновления навыка
}

export type TCity = {
  id: string
  name: string
}

export type TSkillFormData = Pick<
  TSkill,
  'title' | 'category' | 'subcategory' | 'description' | 'images'
>

export type TRole = 'all' | 'teach' | 'learn'
export type TGender = 'any' | 'male' | 'female'

// ТОЛЬКО ДЛЯ РЕГИСТРАЦИИ (экспериентальные данные) //

export type TUserData = {
  id: string
  name: string
  email: string
  password: string // обязательное поле
  birthDate?: Date | null // Тут интерфейс Date, а не строка
  gender?: 'male' | 'female' | 'unspecified' | '' // Добавлена пустая строка (нужно при выборе пола)
  city?: string
  avatar?: string
  about?: string
  skills: TSkillData[]
  createdAt: string
  updatedAt: string
}

export type TSkillData = {
  id: string
  userId: string
  type: 'teach' | 'learn'
  category: string // Тут id, а не имя категории
  subcategory: string // Тут id, а не имя подкатегории
  title?: string // необязательное поле
  description?: string
  images?: string[]
  createdAt?: string
  updatedAt?: string
}

export type TRegisterData = Omit<TUserData, 'about' | 'favorites' | 'likes'>

export type RegisterDataSet = {
  data: TRegisterData
  setData: Dispatch<SetStateAction<TRegisterData>>
  nextStep: () => void // Переход на следующий шаг регистрации
  prevStep?: () => void // Переход на предыдущий шаг регистрации
}

// Сортировка
export type SortDirection = 'asc' | 'desc'

export type SortState = {
  by: string
  direction: SortDirection
}

export type TNotification = {
  id: string
  user: string
  text: string
  date: string
  isRead: boolean
  link?: string
}

export type TToast = {
  id: string
  message: string
  notificationId: string
}

export type TUpdateData = {
  name?: string
  birthDate?: string
  gender?: 'male' | 'female' | 'unspecified'
  city?: string
  avatar?: string
  about?: string
}
