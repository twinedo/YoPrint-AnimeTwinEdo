import { ActionIcon, Tooltip } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import type { AnimeSummary } from '../../types/anime'
import { toggleFavorite } from '../../features/favorites/favoritesSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

interface FavoriteToggleProps {
  anime: AnimeSummary
  size?: 'sm' | 'md' | 'lg'
}

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
} satisfies Record<Required<FavoriteToggleProps>['size'], number>

const FavoriteToggle = ({ anime, size = 'md' }: FavoriteToggleProps) => {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector((state) => Boolean(state.favorites.items[anime.id]))

  return (
    <Tooltip label={isFavorite ? 'Remove from favorites' : 'Save to favorites'} withArrow>
      <ActionIcon
        size={size}
        radius="xl"
        variant={isFavorite ? 'gradient' : 'subtle'}
        gradient={{ from: 'pink', to: 'violet' }}
        color={isFavorite ? undefined : 'gray'}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          dispatch(toggleFavorite(anime))
        }}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? <IconHeartFilled size={iconSizes[size]} /> : <IconHeart size={iconSizes[size]} />}
      </ActionIcon>
    </Tooltip>
  )
}

export default FavoriteToggle
