import { configureStore } from '@reduxjs/toolkit'
import detailReducer from '../features/detail/detailSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
