import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { AnimeSummary } from '../../types/anime'

const FAVORITES_KEY = 'yoprint-anime-favorites'

const loadFavorites = (): Record<number, AnimeSummary> => {
  if (typeof window === 'undefined') return {}
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY)
    if (!stored) return {}
    const parsed: Record<number, AnimeSummary> = JSON.parse(stored)
    return parsed
  } catch (error) {
    console.warn('Unable to parse favorites from storage', error)
    return {}
  }
}

const persistFavorites = (favorites: Record<number, AnimeSummary>) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

interface FavoritesState {
  items: Record<number, AnimeSummary>
}

const initialState: FavoritesState = {
  items: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<AnimeSummary>) {
      const id = action.payload.id
      if (state.items[id]) {
        delete state.items[id]
      } else {
        state.items[id] = action.payload
      }
      persistFavorites(state.items)
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions

export const selectFavorites = (state: RootState) => state.favorites.items
export const isFavoriteSelector = (state: RootState, id: number) => Boolean(state.favorites.items[id])

export default favoritesSlice.reducer
