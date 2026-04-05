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
  password?: string // пароль
  birthDate?: string // "15.05.1990"
  gender?: 'male' | 'female' | 'unspecified' // "male"
  city?: string // "Санкт-Петербург"
  avatar?: string // "https://skillswap.ru/avatar_ivan.jpg"
  about?: string // "Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое."
  skills: TSkill[] // Все навыки пользователя (тип teach/learn различается полем type)
  createdAt: string // "2025-01-15T10:30:00Z"
  updatedAt: string // "2025-03-30T15:20:00Z"
  favorites?: string[] // Массив TSkill.id навыков, добавленных в избранное
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
  createdAt: string // Дата создания навыка
  updatedAt: string // Дата последнего обновления навыка
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

export type TRegisterData = {
  email: string //[step 1]
  password: string // [step 1]
  name: string //[step 2]
  birthDate: Date | null //[step 2]
  gender: 'male' | 'female' | 'unspecified' //[step 2]
  city: string //[step 2]
  avatar: string | null //[step 2]
  learnSkill: {
    //[step 2]
    type: 'learn'
    category: string
    subcategory: string
  }
  teachSkill: {
    //[step 3]
    type: 'teach'
    title: string
    category: string
    subcategory: string
    description: string
    images: string[] | null
  }
}

export type RegisterDataSet = {
  data: TRegisterData
  setData?: () => void
  nextStep?: () => void // обработчик для перемещения на следующий шаг регистрации
  prevStep?: () => void // обработчик для перемещения на следующий шаг регистрации
}
