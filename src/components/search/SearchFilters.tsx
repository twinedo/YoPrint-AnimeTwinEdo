import { ActionIcon, Group, Paper, Select, Slider, Stack, Text, Tooltip } from '@mantine/core'
import { IconAdjustmentsAlt, IconRefresh } from '@tabler/icons-react'
import type { SearchFilters as Filters } from '../../features/search/searchSlice'

interface SearchFiltersProps {
  filters: Filters
  onChange: (filters: Partial<Filters>) => void
}

const statusOptions = [
  { value: 'any', label: 'Any status' },
  { value: 'airing', label: 'Currently airing' },
  { value: 'complete', label: 'Completed' },
  { value: 'upcoming', label: 'Upcoming' },
]

const typeOptions = [
  { value: 'any', label: 'Any format' },
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'ona', label: 'ONA' },
  { value: 'special', label: 'Special' },
]

const SearchFilters = ({ filters, onChange }: SearchFiltersProps) => {
  return (
    <Paper p="lg" radius="lg" className="blurred-panel" withBorder>
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Group gap="sm">
          <IconAdjustmentsAlt size={20} />
          <Text fw={600}>Refine results</Text>
        </Group>
        <Tooltip label="Reset filters">
          <ActionIcon
            variant="subtle"
            onClick={() => onChange({ status: 'any', type: 'any', minScore: null })}
            aria-label="Reset filters"
          >
            <IconRefresh size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Stack gap="md" mt="md">
        <Group gap="md" align="flex-start" wrap="wrap">
          <Select
            label="Status"
            data={statusOptions}
            value={filters.status}
            onChange={(value) => onChange({ status: (value as Filters['status']) ?? 'any' })}
            w={{ base: '100%', sm: '30%' }}
          />
          <Select
            label="Format"
            data={typeOptions}
            value={filters.type}
            onChange={(value) => onChange({ type: (value as Filters['type']) ?? 'any' })}
            w={{ base: '100%', sm: '30%' }}
          />
          <Stack gap={4} w={{ base: '100%', sm: '30%' }}>
            <Text size="sm" c="dimmed">
              Minimum score: {filters.minScore ?? 'any'}
            </Text>
            <Slider
              min={0}
              max={10}
              step={0.5}
              value={filters.minScore ?? 0}
              onChange={(value) => onChange({ minScore: value === 0 ? null : value })}
              marks={[
                { value: 0, label: '0' },
                { value: 5, label: '5' },
                { value: 10, label: '10' },
              ]}
            />
          </Stack>
        </Group>
      </Stack>
    </Paper>
  )
}

export default SearchFilters
