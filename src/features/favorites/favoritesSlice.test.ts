import favoritesReducer, { toggleFavorite } from './favoritesSlice'
import type { AnimeSummary } from '../../types/anime'
import {describe, expect, it, beforeEach} from '@jest/globals';

describe('favoritesSlice', () => {
  const anime: AnimeSummary = {
    id: 42,
    title: 'Fullmetal Alchemist',
  }

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('adds an anime to favorites', () => {
    const state = favoritesReducer(undefined, { type: 'init' })
    const next = favoritesReducer(state, toggleFavorite(anime))
    expect(next.items[anime.id]).toBeDefined()
    expect(JSON.parse(window.localStorage.getItem('yoprint-anime-favorites') ?? '{}')[anime.id]).toBeDefined()
  })

  it('removes an anime when toggled twice', () => {
    const state = favoritesReducer(undefined, { type: 'init' })
    const added = favoritesReducer(state, toggleFavorite(anime))
    const removed = favoritesReducer(added, toggleFavorite(anime))
    expect(removed.items[anime.id]).toBeUndefined()
  })
})
