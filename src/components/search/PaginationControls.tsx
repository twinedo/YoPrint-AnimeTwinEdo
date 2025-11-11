import { Group, Pagination, Paper, Text } from '@mantine/core'

interface PaginationControlsProps {
  page: number
  totalPages: number
  totalItems?: number
  disabled?: boolean
  onChange: (page: number) => void
}

const PaginationControls = ({ page, totalPages, totalItems, disabled, onChange }: PaginationControlsProps) => (
  <Paper p="md" radius="lg" className="blurred-panel" withBorder>
    <Group justify="space-between" wrap="wrap">
      <Text size="sm" c="dimmed">
        Page {page} of {totalPages} · {totalItems ? `${totalItems} titles tracked` : 'tracking live data'}
      </Text>
      <Pagination value={page} onChange={onChange} total={Math.max(totalPages, 1)} disabled={disabled} size="sm" radius="md" />
    </Group>
  </Paper>
)

export default PaginationControls
