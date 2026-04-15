import type { RootState } from '@/store'
import type { TExchange } from '@/utils'
import { loadExchanges } from '@/utils/exchangesStorage'
import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

type ExchangesState = {
  exchanges: TExchange[]
  loading: boolean
  error: string | null
}

const initialState: ExchangesState = {
  exchanges: loadExchanges(),
  loading: false,
  error: null,
}

export const exchangesSlice = createSlice({
  name: 'exchanges',
  initialState,
  reducers: {
    // создание новой заявки
    addExchange(state, action: PayloadAction<TExchange>) {
      state.exchanges.push(action.payload)
    },

    setExchanges(state, action: PayloadAction<TExchange[]>) {
      state.exchanges = action.payload
    },

    // принятие входящей заявки
    acceptExchange(state, action: PayloadAction<string>) {
      const ex = state.exchanges.find((e) => e.id === action.payload)
      if (ex) ex.status = 'accepted'
    },

    // назначение встречи после принятия
    scheduleExchange(state, action: PayloadAction<{ id: string; start: string; end: string }>) {
      const ex = state.exchanges.find((e) => e.id === action.payload.id)
      if (ex) {
        ex.status = 'scheduled'
        ex.meetingStart = action.payload.start
        ex.meetingEnd = action.payload.end
      }
    },

    // отклонение входящей заявки
    declineExchange(state, action: PayloadAction<string>) {
      const ex = state.exchanges.find((e) => e.id === action.payload)
      if (ex) ex.status = 'declined'
    },

    // отмена исходящей заявки инициатором
    cancelExchange(state, action: PayloadAction<string>) {
      const ex = state.exchanges.find((e) => e.id === action.payload)

      if (!ex) return

      if (ex.status === 'pending' && ex.fromUserId) {
        ex.status = 'cancelled'
      }
    },
  },
})

export const exchangesReducer = exchangesSlice.reducer

export const {
  addExchange,
  setExchanges,
  acceptExchange,
  declineExchange,
  cancelExchange,
  scheduleExchange,
} = exchangesSlice.actions

export const getExchangesState = (state: RootState) => state.exchanges

// Все обмены
export const getMyExchanges = createSelector(
  getExchangesState,
  (_: RootState, userId?: string) => userId,
  (state, userId) => {
    if (!userId) return []

    return state.exchanges.filter((ex) => ex.fromUserId === userId || ex.toUserId === userId)
  }
)

// Все заявки
export const getExchangeRequests = createSelector(getMyExchanges, (exchanges) =>
  exchanges.filter((ex) => ex.status === 'pending')
)

// Входящие заявки
export const getIncomingRequests = createSelector(
  getMyExchanges,
  (_: RootState, userId?: string) => userId,
  (exchanges, userId) => exchanges.filter((ex) => ex.toUserId === userId && ex.status === 'pending')
)

// Исходящие заявки
export const getOutgoingRequests = createSelector(
  getMyExchanges,
  (_: RootState, userId?: string) => userId,
  (exchanges, userId) =>
    exchanges.filter((ex) => ex.fromUserId === userId && ex.status === 'pending')
)

// Активные обмены
export const getActiveExchanges = createSelector(getMyExchanges, (exchanges) =>
  exchanges.filter((ex) => ex.status === 'accepted' || ex.status === 'scheduled')
)

// История заявок
export const getRequestHistory = createSelector(getMyExchanges, (exchanges) =>
  exchanges.filter((ex) => ex.status === 'declined' || ex.status === 'cancelled')
)
