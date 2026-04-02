import { type TCategory, type TSubcategory, getCategoriesApi } from '@/utils'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type CategoriesState = {
  categories: TCategory[]
  subcategories: TSubcategory[]
  loading: boolean
  error: string | null
}

type RootState = {
  categories: CategoriesState
}

export const CATEGORIES_LIST = [
  {
    id: '1',
    name: 'Бизнес и карьера',
    color: '--category-business',
    icon: 'briefcase',
    subcategories: [
      'Управление командой',
      'Маркетинг и реклама',
      'Продажи и переговоры',
      'Личный бренд',
      'Резюме и собеседование',
      'Тайм-менеджмент',
      'Проектное управление',
      'Предпринимательство',
    ],
  },
  {
    id: '2',
    name: 'Творчество и искусство',
    color: '--category-creative',
    icon: 'palette',
    subcategories: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY',
    ],
  },
  {
    id: '3',
    name: 'Иностранные языки',
    color: '--category-languages',
    icon: 'earth',
    subcategories: [
      'Английский',
      'Французский',
      'Испанский',
      'Немецкий',
      'Китайский',
      'Японский',
      'Подготовка к экзаменам (IELTS, TOEFL)',
    ],
  },
  {
    id: '4',
    name: 'Образование и развитие',
    color: '--category-education',
    icon: 'book',
    subcategories: [
      'Личностное развитие',
      'Навыки обучения',
      'Когнитивные техники',
      'Скорочтение',
      'Навыки преподавания',
      'Коучинг',
    ],
  },
  {
    id: '5',
    name: 'Дом и уют',
    color: '--category-home',
    icon: 'home',
    subcategories: [
      'Уборка и организация',
      'Домашние финансы',
      'Приготовление еды',
      'Домашние растения',
      'Ремонт',
      'Хранение вещей',
    ],
  },
  {
    id: '6',
    name: 'Здоровье и лайфстайл',
    color: '--category-health',
    icon: 'list',
    subcategories: [
      'Йога и медитация',
      'Питание и ЗОЖ',
      'Ментальное здоровье',
      'Осознанность',
      'Физические тренировки',
      'Сон и восстановление',
      'Баланс жизни и работы',
    ],
  },
]

const initialState: CategoriesState = {
  categories: [],
  subcategories: [],
  loading: false,
  error: null,
}

export const getCategories = createAsyncThunk('categories/getAll', async () => getCategoriesApi())

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false
        state.categories = action.payload.categories
        state.subcategories = action.payload.subcategories
      })
  },
})

export const getCategoriesState = (state: RootState) => state.categories
export const getAllCategories = (state: RootState) => state.categories.categories
export const getAllSubcategories = (state: RootState) => state.categories.subcategories

export const categoriesReducer = categoriesSlice.reducer
