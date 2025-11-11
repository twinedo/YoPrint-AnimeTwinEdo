import { useEffect } from 'react'
import {
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import FavoriteToggle from '../components/shared/FavoriteToggle'
import EmptyState from '../components/feedback/EmptyState'
import ErrorState from '../components/feedback/ErrorState'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import {
  clearDetail,
  fetchAnimeDetailById,
  hydrateFromCache,
  selectDetailState,
} from '../features/detail/detailSlice'

const DetailPage = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const detail = useAppSelector(selectDetailState)
  const numericId = Number(id)
  const cached = useAppSelector((state) =>
    state.search.items.find((anime) => anime.id === numericId),
  )

  useEffect(() => {
    if (!cached) return
    dispatch(hydrateFromCache(cached))
  }, [dispatch, cached])

  useEffect(() => {
    if (!id || Number.isNaN(numericId)) return
    const promise = dispatch(fetchAnimeDetailById(numericId))
    return () => {
      promise.abort()
      dispatch(clearDetail())
    }
  }, [dispatch, id, numericId])

  if (!id || Number.isNaN(numericId)) {
    return <EmptyState title="Missing anime id" description="Pick an anime from the search page." />
  }

  if (detail.error) {
    return (
      <ErrorState
        message={detail.error}
        onRetry={() => numericId && dispatch(fetchAnimeDetailById(numericId))}
      />
    )
  }

  const anime = detail.anime

  if (!anime && detail.status === 'loading') {
    return (
      <Paper radius="lg" p="xl" className="blurred-panel" withBorder>
        <Skeleton height={320} radius="lg" mb="md" />
        <Skeleton height={24} width="60%" />
        <Skeleton height={14} mt="sm" />
      </Paper>
    )
  }

  if (!anime) {
    return <EmptyState title="No data yet" description="We could not find that anime." />
  }

  const heroImage =
    anime.images?.webp?.largeImageUrl || anime.images?.jpg?.largeImageUrl || anime.images?.jpg?.imageUrl

  return (
    <Stack gap="xl">
      <Paper radius="lg" className="detail-hero" withBorder>
        <Box className="detail-hero__media" style={{ backgroundImage: `url(${heroImage})` }} />
        <Box className="detail-hero__overlay" />
        <Stack gap="sm" className="detail-hero__content">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <div>
              <Text size="sm" c="dimmed">
                {anime.season ? `${anime.season} ${anime.year ?? ''}` : 'Season TBA'} · {anime.type ?? 'Format'}
              </Text>
              <Text fw={700} size="xl">
                {anime.title}
              </Text>
            </div>
            <FavoriteToggle anime={anime} />
          </Group>
          <Group gap="lg" wrap="wrap">
            <div>
              <Text size="sm" c="dimmed">
                Score
              </Text>
              <Text fw={600} size="lg">
                {anime.score ? anime.score.toFixed(1) : 'NR'}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Ranked
              </Text>
              <Text fw={600} size="lg">
                {anime.rank ? `#${anime.rank}` : '—'}
              </Text>
            </div>
            <div>
              <Text size="sm" c="dimmed">
                Popularity
              </Text>
              <Text fw={600} size="lg">
                {anime.popularity ? `#${anime.popularity}` : '—'}
              </Text>
            </div>
          </Group>
          <Group gap="xs">
            {anime.genres?.map((genre) => (
              <Badge key={genre} variant="light" color="violet" radius="sm">
                {genre}
              </Badge>
            ))}
          </Group>
          <Text size="sm" maw={720} c="gray.0">
            {anime.synopsis || 'Synopsis coming soon.'}
          </Text>
          {anime.trailer?.url && (
            <Button
              component="a"
              href={anime.trailer.url}
              target="_blank"
              rel="noreferrer"
              variant="gradient"
              gradient={{ from: 'violet', to: 'pink' }}
            >
              Watch trailer
            </Button>
          )}
        </Stack>
      </Paper>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Paper radius="lg" p="lg" className="blurred-panel" withBorder>
            <Text fw={600} mb="xs">
              Synopsis
            </Text>
            <Text c="dimmed">
              {anime.background || anime.synopsis || 'No synopsis provided yet.'}
            </Text>
          </Paper>
          <Paper radius="lg" p="lg" className="blurred-panel" withBorder mt="lg">
            <Text fw={600} mb="md">
              Production
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <div>
                <Text size="sm" c="dimmed">
                  Studios
                </Text>
                <Text fw={500}>{anime.studios?.join(', ') || 'TBD'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Rating
                </Text>
                <Text fw={500}>{anime.rating ?? 'NR'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Episodes
                </Text>
                <Text fw={500}>{anime.episodes ?? '—'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Duration
                </Text>
                <Text fw={500}>{anime.duration ?? '—'}</Text>
              </div>
            </SimpleGrid>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper radius="lg" p="lg" className="blurred-panel" withBorder>
            <Text fw={600} mb="sm">
              Streaming
            </Text>
            {anime.streaming?.length ? (
              <Stack gap="xs">
                {anime.streaming.map((item) => (
                  <Button key={item.url} component="a" href={item.url} target="_blank" rel="noreferrer" variant="subtle">
                    {item.name}
                  </Button>
                ))}
              </Stack>
            ) : (
              <Text size="sm" c="dimmed">
                No official streaming links reported.
              </Text>
            )}
          </Paper>
          <Paper radius="lg" p="lg" className="blurred-panel" withBorder mt="lg">
            <Text fw={600} mb="sm">
              Relations
            </Text>
            {anime.relations?.length ? (
              <Stack gap="xs">
                {anime.relations.map((relation, index) => (
                  <Box key={`${relation.relation}-${index}`}>
                    <Text size="sm" c="dimmed">
                      {relation.relation}
                    </Text>
                    {relation.entries.map((entry) =>
                      entry.type === 'anime' ? (
                        <Text
                          component={Link}
                          to={`/anime/${entry.mal_id}`}
                          key={entry.mal_id}
                          className="text-link"
                        >
                          {entry.name}
                        </Text>
                      ) : (
                        <Text key={`${entry.mal_id}-${entry.name}`}>{entry.name}</Text>
                      ),
                    )}
                  </Box>
                ))}
              </Stack>
            ) : (
              <Text size="sm" c="dimmed">
                No related series logged.
              </Text>
            )}
          </Paper>
        </Grid.Col>
      </Grid>

      {detail.status === 'loading' && (
        <Group justify="center">
          <Loader />
        </Group>
      )}
    </Stack>
  )
}

export default DetailPage
