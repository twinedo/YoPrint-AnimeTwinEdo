import { Divider, Group, Loader, Paper, Stack, Text } from '@mantine/core'
import { IconTrendingUp } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchTrendingAnime } from '../../services/jikanClient'
import type { AnimeSummary } from '../../types/anime'

const TrendingSpotlight = () => {
  const [entries, setEntries] = useState<AnimeSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetchTrendingAnime(controller.signal)
      .then((payload) => {
        setEntries(payload)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message ?? 'Unable to load spotlight')
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <Paper radius="lg" p="lg" className="blurred-panel" withBorder>
      <Group justify="space-between" align="center" mb="sm">
        <Group gap="xs">
          <IconTrendingUp size={18} />
          <Text fw={600}>Trending now</Text>
        </Group>
        {loading && <Loader size="sm" />}
      </Group>
      <Stack gap="sm">
        {error && (
          <Text size="sm" c="red.4">
            {error}
          </Text>
        )}
        {!loading && !error && (
          <Stack gap="sm">
            {entries.map((anime, index) => (
              <Stack key={anime.id} gap={0}>
                <Group justify="space-between">
                  <Group gap="xs">
                    <Text fw={600}>#{index + 1}</Text>
                    <Text component={Link} to={`/anime/${anime.id}`} className="text-link">
                      {anime.title}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    Score {anime.score ? anime.score.toFixed(1) : 'NR'}
                  </Text>
                </Group>
                <Text size="xs" c="dimmed">
                  {anime.genres?.slice(0, 2).join(' • ') || 'Genre TBD'}
                </Text>
                {index < entries.length - 1 && <Divider variant="dashed" mt="xs" />}
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}

export default TrendingSpotlight
