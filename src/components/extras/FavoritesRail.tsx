import { Avatar, Badge, Group, Paper, ScrollArea, Stack, Text } from '@mantine/core'
import { IconHeart } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/useAppSelector'

const FavoritesRail = () => {
  const favorites = useAppSelector((state) => Object.values(state.favorites.items))
  if (favorites.length === 0) return null

  return (
    <Paper radius="lg" p="lg" className="blurred-panel" withBorder>
      <Group justify="space-between" mb="sm">
        <Group gap="xs">
          <IconHeart size={18} />
          <Text fw={600}>Your curated shelf</Text>
        </Group>
        <Badge variant="light" color="pink">
          {favorites.length} saved
        </Badge>
      </Group>
      <ScrollArea h={160} type="always" offsetScrollbars>
        <Group wrap="nowrap" gap="lg">
          {favorites.map((anime) => (
            <Stack
              key={anime.id}
              gap={4}
              component={Link}
              to={`/anime/${anime.id}`}
              className="favorite-chip"
            >
              <Group gap="sm">
                <Avatar
                  radius="md"
                  src={
                    anime.images?.jpg?.smallImageUrl ||
                    anime.images?.webp?.smallImageUrl ||
                    anime.images?.jpg?.imageUrl
                  }
                  alt={anime.title}
                />
                <div>
                  <Text fw={600} size="sm" lineClamp={1}>
                    {anime.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {anime.type ?? '—'} · Score {anime.score?.toFixed(1) ?? 'NR'}
                  </Text>
                </div>
              </Group>
            </Stack>
          ))}
        </Group>
      </ScrollArea>
    </Paper>
  )
}

export default FavoritesRail
