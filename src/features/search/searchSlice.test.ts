import searchReducer, { fetchAnimeList, setPage, setQuery } from './searchSlice'
import type { AnimeSummary, PaginationInfo, SearchResponse } from '../../types/anime'
import {describe, expect, it} from '@jest/globals';

describe('searchSlice', () => {
  const baseState = searchReducer(undefined, { type: 'init' })

  it('sets query and resets pagination', () => {
    const mutated = { ...baseState, page: 4 }
    const result = searchReducer(mutated, setQuery('Naruto'))
    expect(result.query).toBe('Naruto')
    expect(result.page).toBe(1)
  })

  it('updates page when requested', () => {
    const result = searchReducer(baseState, setPage(3))
    expect(result.page).toBe(3)
  })

  it('ignores stale fulfilled requests', () => {
    const pending = {
      ...baseState,
      status: 'loading' as const,
      currentRequestId: 'current',
    }
    const anime: AnimeSummary = {
      id: 1,
      title: 'Test',
    }
    const pagination: PaginationInfo = {
      currentPage: 1,
      lastVisiblePage: 1,
      hasNextPage: false,
      itemsPerPage: 10,
      totalItems: 1,
    }
    const payload: SearchResponse = { data: [anime], pagination }
    const staleAction = fetchAnimeList.fulfilled(payload, 'stale', undefined)
    const result = searchReducer(pending, staleAction)
    expect(result.items).toHaveLength(0)
    expect(result.status).toBe('loading')
  })

  it('stores latest results when request id matches', () => {
    const pending = {
      ...baseState,
      status: 'loading' as const,
      currentRequestId: 'abc',
      query: 'bleach',
    }
    const anime: AnimeSummary = {
      id: 7,
      title: 'Bleach',
      score: 8.5,
    }
    const pagination: PaginationInfo = {
      currentPage: 1,
      lastVisiblePage: 2,
      hasNextPage: true,
      itemsPerPage: 12,
      totalItems: 24,
    }
    const payload: SearchResponse = { data: [anime], pagination }
    const action = fetchAnimeList.fulfilled(payload, 'abc', undefined)
    const result = searchReducer(pending, action)
    expect(result.items).toHaveLength(1)
    expect(result.status).toBe('succeeded')
    expect(result.mode).toBe('search')
    expect(result.recentSearches[0]).toBe('bleach')
  })
})
