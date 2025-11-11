import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAnimeDetail } from '../../services/jikanClient'
import type { RootState } from '../../app/store'
import type { AnimeSummary } from '../../types/anime'

interface DetailState {
  anime?: AnimeSummary
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string
  currentRequestId?: string
}

const initialState: DetailState = {
  status: 'idle',
}

export const fetchAnimeDetailById = createAsyncThunk(
  'detail/fetchAnimeDetailById',
  async (id: number, { signal }) => fetchAnimeDetail(id, signal),
)

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    clearDetail(state) {
      state.anime = undefined
      state.status = 'idle'
      state.error = undefined
    },
    hydrateFromCache(state, action: PayloadAction<AnimeSummary | undefined>) {
      if (!action.payload) return
      state.anime = action.payload
      state.status = 'succeeded'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeDetailById.pending, (state, action) => {
        state.status = 'loading'
        state.error = undefined
        state.currentRequestId = action.meta.requestId
      })
      .addCase(fetchAnimeDetailById.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        state.status = 'succeeded'
        state.anime = action.payload
        state.currentRequestId = undefined
      })
      .addCase(fetchAnimeDetailById.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return
        if (action.error.name === 'AbortError') {
          state.status = 'idle'
          state.currentRequestId = undefined
          return
        }
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load anime details'
        state.currentRequestId = undefined
      })
  },
})

export const { clearDetail, hydrateFromCache } = detailSlice.actions

export const selectDetailState = (state: RootState) => state.detail

export default detailSlice.reducer
