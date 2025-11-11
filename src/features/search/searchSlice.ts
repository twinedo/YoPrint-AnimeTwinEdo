import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { searchAnime } from '../../services/jikanClient'
import type { AnimeSummary, PaginationInfo, SearchParams } from '../../types/anime'

export interface SearchFilters {
  status: 'any' | 'airing' | 'complete' | 'upcoming'
  type: 'any' | 'tv' | 'movie' | 'ova' | 'ona' | 'special'
  minScore: number | null
}

interface SearchState {
  query: string
  page: number
  filters: SearchFilters
  items: AnimeSummary[]
  pagination: PaginationInfo
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
  currentRequestId?: string
  mode: 'search' | 'top'
  lastUpdated?: number
  recentSearches: string[]
}

const initialState: SearchState = {
  query: '',
  page: 1,
  filters: {
    status: 'any',
    type: 'any',
    minScore: null,
  },
  items: [],
  pagination: {
    currentPage: 1,
    lastVisiblePage: 1,
    hasNextPage: false,
    itemsPerPage: 12,
    totalItems: 0,
  },
  status: 'idle',
  mode: 'top',
  recentSearches: [],
}

const selectSearchParams = (state: RootState): SearchParams => ({
  query: state.search.query,
  page: state.search.page,
  filters: state.search.filters,
})

export const fetchAnimeList = createAsyncThunk(
  'search/fetchAnimeList',
  async (_, { signal, getState }) => {
    const params = selectSearchParams(getState() as RootState)
    return searchAnime(params, signal)
  },
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
      state.page = 1
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setFilters(state, action: PayloadAction<Partial<SearchFilters>>) {
      state.filters = { ...state.filters, ...action.payload }
      state.page = 1
    },
    hydrateFromRecent(state, action: PayloadAction<string>) {
      state.query = action.payload
      state.page = 1
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeList.pending, (state, action) => {
        state.status = 'loading'
        state.error = undefined
        state.currentRequestId = action.meta.requestId
      })
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        state.status = 'succeeded'
        state.items = action.payload.data
        state.pagination = action.payload.pagination
        state.error = undefined
        state.currentRequestId = undefined
        const trimmedQuery = state.query.trim()
        state.mode = trimmedQuery.length > 0 ? 'search' : 'top'
        state.lastUpdated = Date.now()
        if (trimmedQuery) {
          state.recentSearches = [
            trimmedQuery,
            ...state.recentSearches.filter((entry) => entry !== trimmedQuery),
          ].slice(0, 5)
        }
      })
      .addCase(fetchAnimeList.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        if (action.error.name === 'AbortError') {
          state.status = 'idle'
          state.currentRequestId = undefined
          return
        }
        state.status = 'failed'
        state.error = action.error.message || 'Something went wrong while fetching anime'
        state.currentRequestId = undefined
      })
  },
})

export const { setQuery, setPage, setFilters, hydrateFromRecent } = searchSlice.actions

export const selectSearchState = (state: RootState) => state.search

export default searchSlice.reducer
