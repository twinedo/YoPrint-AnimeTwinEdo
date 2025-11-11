import { Badge, Box, Card, Group, Image, Stack, Text } from '@mantine/core'
import { IconPlayerPlay } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import type { AnimeSummary } from '../../types/anime'
import FavoriteToggle from '../shared/FavoriteToggle'
import { formatAirDate, formatScore, shortenText } from '../../utils/formatters'

interface ResultCardProps {
  anime: AnimeSummary
}

const ResultCard = ({ anime }: ResultCardProps) => {
  const imageUrl =
    anime.images?.webp?.largeImageUrl ||
    anime.images?.jpg?.largeImageUrl ||
    anime.images?.webp?.imageUrl ||
    anime.images?.jpg?.imageUrl ||
    '/vite.svg'

  return (
    <Card
      component={Link}
      to={`/anime/${anime.id}`}
      className="anime-card"
      padding="md"
      radius="lg"
      shadow="lg"
      withBorder
    >
      <Card.Section className="anime-card__media">
        <Image src={imageUrl} alt={anime.title} height={200} radius="lg" fit="cover" />
        <Box className="anime-card__overlay" />
        <Group className="anime-card__stats" justify="space-between" px="md" py="xs">
          <Text fw={600}>Score {formatScore(anime.score)}</Text>
          <Group gap="xs">
            <Text size="sm" c="dimmed">
              {anime.episodes ? `${anime.episodes} eps` : 'N/A'}
            </Text>
            <Text size="sm" c="dimmed">
              {formatAirDate(anime.season, anime.year)}
            </Text>
          </Group>
        </Group>
        <Box className="anime-card__favorite">
          <FavoriteToggle anime={anime} />
        </Box>
      </Card.Section>
      <Stack gap={6} mt="sm">
        <Group justify="space-between" align="flex-start">
          <Text fw={600} lineClamp={2} size="lg">
            {anime.title}
          </Text>
          <Badge variant="light" color="pink" radius="sm">
            {anime.type ?? '—'}
          </Badge>
        </Group>
        <Text size="sm" c="dimmed" lineClamp={3}>
          {shortenText(anime.synopsis, 160)}
        </Text>
        <Group gap="xs" mt="xs">
          {anime.genres?.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" radius="xl" color="violet">
              {genre}
            </Badge>
          ))}
          {anime.trailer?.url && anime.trailer.youtubeId && (
            <Badge
              component="span"
              radius="xl"
              color="lime"
              leftSection={<IconPlayerPlay size={12} />}
            >
              Trailer
            </Badge>
          )}
        </Group>
      </Stack>
    </Card>
  )
}

export default ResultCard
