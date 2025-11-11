import { Button, Paper, Stack, Text } from '@mantine/core'
import { IconMoodSearch } from '@tabler/icons-react'
import { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  extraContent?: ReactNode
}

const EmptyState = ({ title, description, actionLabel, onAction, extraContent }: EmptyStateProps) => (
  <Paper radius="lg" p="xl" withBorder className="blurred-panel" ta="center">
    <IconMoodSearch size={40} color="var(--mantine-color-violet-4)" style={{ marginInline: 'auto' }} />
    <Stack gap="xs" mt="md" align="center">
      <Text fw={600}>{title}</Text>
      <Text c="dimmed" maw={420}>
        {description}
      </Text>
      {actionLabel && (
        <Button onClick={onAction} variant="gradient" gradient={{ from: 'violet', to: 'pink' }}>
          {actionLabel}
        </Button>
      )}
      {extraContent}
    </Stack>
  </Paper>
)

export default EmptyState
