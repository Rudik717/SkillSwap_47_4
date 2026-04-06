import {
  filterCountSelector,
  filterReducer,
  isFilterActiveSelector,
  resetFilter,
  setCities,
  setGender,
  setRole,
  setSubcategories,
} from '@/store/filter'
import type { TGender, TRole } from '@/utils'
import { describe, expect, it } from '@jest/globals'

type FilterState = {
  role: TRole
  subcategories: string[]
  gender: TGender
  cities: string[]
}

describe('filterSlice', () => {
  const initialState: FilterState = {
    role: 'all',
    subcategories: [],
    gender: 'any',
    cities: [],
  }

  const createState = (filterState = initialState) => ({
    filter: filterState,
  })

  // Тесты редюсера

  it('Тест возврата при создании initial state', () => {
    const state = filterReducer(undefined, { type: 'unknown' })
    expect(state).toEqual(initialState)
  })

  it('Тест задания роли [setRole]', () => {
    const state = filterReducer(initialState, setRole('admin' as TRole))
    expect(state.role).toBe('admin')
  })

  it('Тест задания подкатегорий [setSubcategories]', () => {
    const state = filterReducer(initialState, setSubcategories(['a', 'b']))
    expect(state.subcategories).toEqual(['a', 'b'])
  })

  it('Тест задания гендера [setGender]', () => {
    const state = filterReducer(initialState, setGender('male' as TGender))
    expect(state.gender).toBe('male')
  })

  it('Тест задания города [setCities]', () => {
    const state = filterReducer(initialState, setCities(['Moscow']))
    expect(state.cities).toEqual(['Moscow'])
  })

  it('Тест сброса фильтров [resetFilter]', () => {
    const modifiedState = {
      role: 'admin',
      subcategories: ['a'],
      gender: 'male',
      cities: ['Moscow'],
    }

    const state = filterReducer(modifiedState as FilterState, resetFilter())

    expect(state).toEqual(initialState)
  })

  // Тесты селектора

  describe('Тест селектора [isFilterActiveSelector]', () => {
    it('should return false for initial state', () => {
      const result = isFilterActiveSelector(createState())
      expect(result).toBe(false)
    })

    it('Тест возврата true при заданной роли', () => {
      const result = isFilterActiveSelector(
        createState({ ...initialState, role: 'admin' as TRole })
      )
      expect(result).toBe(true)
    })

    it('Тест возврата true при заданных городах', () => {
      const result = isFilterActiveSelector(createState({ ...initialState, cities: ['Moscow'] }))
      expect(result).toBe(true)
    })
  })

  describe('Тест селектора [filterCountSelector]', () => {
    it('should return 0 for initial state', () => {
      const result = filterCountSelector(createState())
      expect(result).toBe(0)
    })

    it('Тест счетчика ролей и гендера', () => {
      const result = filterCountSelector(
        createState({
          ...initialState,
          role: 'admin' as TRole,
          gender: 'male' as TGender,
        })
      )

      expect(result).toBe(2)
    })

    it('Тест счетчика городов и подкатегорий', () => {
      const result = filterCountSelector(
        createState({
          ...initialState,
          cities: ['Moscow', 'SPB'],
          subcategories: ['a'],
        })
      )

      expect(result).toBe(3)
    })

    it('Тест счетчика всех полей', () => {
      const result = filterCountSelector(
        createState({
          role: 'admin' as TRole,
          gender: 'male' as TGender,
          cities: ['Moscow'],
          subcategories: ['a', 'b'],
        } as FilterState)
      )

      expect(result).toBe(5)
    })
  })
})
