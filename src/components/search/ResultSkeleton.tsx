import { Card, Group, Skeleton, Stack } from '@mantine/core'

const ResultSkeleton = () => (
  <Card padding="sm" radius="lg" className="anime-card">
    <Skeleton height={180} radius="lg" />
    <Stack gap="xs" mt="sm">
      <Skeleton height={18} width="80%" />
      <Skeleton height={12} width="60%" />
      <Group gap="xs">
        <Skeleton height={20} width={80} radius="xl" />
        <Skeleton height={20} width={80} radius="xl" />
      </Group>
    </Stack>
  </Card>
)

export default ResultSkeleton
