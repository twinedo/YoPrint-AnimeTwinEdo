import { Group, Loader, Paper, Stack, Text, TextInput, ThemeIcon } from '@mantine/core'
import { IconSearch, IconSparkles, IconX } from '@tabler/icons-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  loading: boolean
  recentSearches: string[]
  onRecentSelect: (value: string) => void
}

const SearchBar = ({ value, onChange, loading, recentSearches, onRecentSelect }: SearchBarProps) => {
  return (
    <Paper p="lg" radius="lg" className="blurred-panel" withBorder>
      <Stack gap="sm">
        <Group gap="xs">
          <ThemeIcon variant="gradient" gradient={{ from: 'violet', to: 'pink' }} radius="md">
            <IconSparkles size={16} />
          </ThemeIcon>
          <Text fw={600}>Instant anime search with server pagination</Text>
        </Group>
        <TextInput
          size="lg"
          radius="md"
          leftSection={<IconSearch size={18} />}
          rightSection={
            value ? (
              <button className="clear-button" type="button" onClick={() => onChange('')} aria-label="Clear search">
                {loading ? <Loader size="xs" /> : <IconX size={16} />}
              </button>
            ) : loading ? (
              <Loader size="sm" />
            ) : undefined
          }
          placeholder="Search for a title, studio, or keyword"
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
        {recentSearches.length > 0 && (
          <Group gap="xs" wrap="wrap">
            {recentSearches.map((entry) => (
              <Text
                key={entry}
                className="recent-chip"
                onClick={() => onRecentSelect(entry)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') onRecentSelect(entry)
                }}
              >
                {entry}
              </Text>
            ))}
          </Group>
        )}
      </Stack>
    </Paper>
  )
}

export default SearchBar
