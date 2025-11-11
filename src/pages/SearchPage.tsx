import { useEffect, useMemo, useState } from 'react'
import { Grid, Group, Paper, Stack, Text } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import SearchBar from '../components/search/SearchBar'
import SearchFilters from '../components/search/SearchFilters'
import ResultsGrid from '../components/search/ResultsGrid'
import PaginationControls from '../components/search/PaginationControls'
import EmptyState from '../components/feedback/EmptyState'
import ErrorState from '../components/feedback/ErrorState'
import TrendingSpotlight from '../components/extras/TrendingSpotlight'
import FavoritesRail from '../components/extras/FavoritesRail'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  fetchAnimeList,
  hydrateFromRecent,
  selectSearchState,
  setFilters,
  setPage,
  setQuery,
} from '../features/search/searchSlice'
import { formatNumber } from '../utils/formatters'

const SearchPage = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector(selectSearchState)
  const { query, filters, page, items, pagination, status, error, mode, recentSearches } = search
  const [localQuery, setLocalQuery] = useState(query)
  const [debouncedQuery] = useDebouncedValue(localQuery, 250)

  useEffect(() => {
    if (debouncedQuery.trim() === query.trim()) return
    dispatch(setQuery(debouncedQuery))
  }, [debouncedQuery, dispatch, query])

  useEffect(() => {
    const promise = dispatch(fetchAnimeList())
    return () => {
      promise.abort()
    }
  }, [dispatch, query, page, filters.status, filters.type, filters.minScore])

  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const avgScore = useMemo(() => {
    const scored = items.filter((anime) => typeof anime.score === 'number')
    if (!scored.length) return 'NR'
    const total = scored.reduce((sum, anime) => sum + (anime.score ?? 0), 0)
    return (total / scored.length).toFixed(1)
  }, [items])

  const avgEpisodes = useMemo(() => {
    const withEpisodes = items.filter((anime) => typeof anime.episodes === 'number')
    if (!withEpisodes.length) return '—'
    const total = withEpisodes.reduce((sum, anime) => sum + (anime.episodes ?? 0), 0)
    return `${Math.round(total / withEpisodes.length)} eps`
  }, [items])

  const audience = useMemo(() => {
    const members = items.reduce((sum, anime) => sum + (anime.members ?? 0), 0)
    return formatNumber(members)
  }, [items])

  const showEmpty = status === 'succeeded' && items.length === 0
  const isLoading = status === 'loading'

  return (
    <Stack gap="xl">
      <SearchBar
        value={localQuery}
        onChange={setLocalQuery}
        loading={isLoading}
        recentSearches={recentSearches}
        onRecentSelect={(value) => {
          setLocalQuery(value)
          dispatch(hydrateFromRecent(value))
        }}
      />
      <SearchFilters filters={filters} onChange={(next) => dispatch(setFilters(next))} />
      <FavoritesRail />
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            <Paper radius="lg" p="lg" className="blurred-panel" withBorder>
              <Group justify="space-between" align="flex-start" wrap="wrap">
                <div>
                  <Text size="sm" c="dimmed">
                    Mode: {mode === 'search' ? 'Keyword search' : 'Top airing list'}
                  </Text>
                  <Text fw={600} size="lg">
                    {pagination.totalItems ? `${pagination.totalItems} titles` : 'Live ranking'}
                  </Text>
                </div>
                <Group gap="xl" wrap="wrap">
                  <div>
                    <Text size="sm" c="dimmed">
                      Avg score
                    </Text>
                    <Text fw={600}>{avgScore}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">
                      Avg episodes
                    </Text>
                    <Text fw={600}>{avgEpisodes}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="dimmed">
                      Audience
                    </Text>
                    <Text fw={600}>{audience}</Text>
                  </div>
                </Group>
              </Group>
            </Paper>

            {error && <ErrorState message={error} onRetry={() => dispatch(fetchAnimeList())} />}

            {!error && (
              <Stack gap="lg">
                {showEmpty ? (
                  <EmptyState
                    title="Nothing matched your filters"
                    description="Try broadening your search or removing some filters."
                    actionLabel="Reset filters"
                    onAction={() => {
                      setLocalQuery('')
                      dispatch(setQuery(''))
                      dispatch(setFilters({ status: 'any', type: 'any', minScore: null }))
                    }}
                  />
                ) : (
                  <ResultsGrid items={items} loading={isLoading} />
                )}

                <PaginationControls
                  page={page}
                  totalPages={pagination.lastVisiblePage}
                  totalItems={pagination.totalItems}
                  disabled={isLoading}
                  onChange={(next) => dispatch(setPage(next))}
                />
              </Stack>
            )}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <TrendingSpotlight />
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

export default SearchPage
