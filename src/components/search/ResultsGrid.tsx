import { SimpleGrid } from '@mantine/core'
import type { AnimeSummary } from '../../types/anime'
import ResultCard from './ResultCard'
import ResultSkeleton from './ResultSkeleton'

interface ResultsGridProps {
  items: AnimeSummary[]
  loading: boolean
}

const ResultsGrid = ({ items, loading }: ResultsGridProps) => {
  const skeletons = Array.from({ length: 6 }, (_, index) => <ResultSkeleton key={`skeleton-${index}`} />)
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
      {loading ? skeletons : items.map((anime) => <ResultCard key={anime.id} anime={anime} />)}
    </SimpleGrid>
  )
}

export default ResultsGrid
