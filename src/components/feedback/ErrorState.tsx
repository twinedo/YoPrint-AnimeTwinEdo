import { Button, Paper, Stack, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <Paper radius="lg" p="xl" withBorder className="blurred-panel" ta="center">
    <IconAlertTriangle size={40} color="var(--mantine-color-red-4)" style={{ marginInline: 'auto' }} />
    <Stack gap="xs" mt="md" align="center">
      <Text fw={600}>We hit a turbulence</Text>
      <Text c="dimmed" maw={420}>
        {message}
      </Text>
      {onRetry && (
        <Button variant="light" onClick={onRetry} color="red">
          Try again
        </Button>
      )}
    </Stack>
  </Paper>
)

export default ErrorState
