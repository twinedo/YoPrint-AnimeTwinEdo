import { useMemo } from 'react'
import { ActionIcon, AppShell, Badge, Container, Group, Text, Title } from '@mantine/core'
import { IconBrandGithub, IconMoonStars } from '@tabler/icons-react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Discover', to: '/' },
]

const App = () => {
  const location = useLocation()
  const active = useMemo(() => location.pathname, [location.pathname])

  return (
    <AppShell
      padding="xl"
      header={{ height: 70 }}
      styles={{
        main: {
          background: 'radial-gradient(circle at 20% 20%, rgba(91, 76, 255, 0.15), transparent 50%),\n            radial-gradient(circle at 80% 0%, rgba(255, 0, 128, 0.25), transparent 55%),\n            #050111',
        },
      }}
    >
      <AppShell.Header withBorder={false} className="glass-header">
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Group gap="xs">
              <Link to="/" className="logo-mark">
                YoPrint
              </Link>
              <Badge variant="gradient" gradient={{ from: 'pink', to: 'violet' }} radius="sm">
                AnimeTwinEdo
              </Badge>
            </Group>
            <Group gap="lg">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  className={active === link.to ? 'nav-link nav-link--active' : 'nav-link'}
                  to={link.to}
                >
                  {link.label}
                </Link>
              ))}
              <ActionIcon
                component="a"
                href="https://github.com/twinedo"
                target="_blank"
                rel="noreferrer"
                variant="subtle"
                aria-label="Open GitHub profile"
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
              <ActionIcon variant="subtle" aria-label="Toggle aesthetic mode">
                <IconMoonStars size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg" py="xl">
          <Title order={1} fw={600} mb="xs">
            Anime Intelligence Console
          </Title>
          <Text c="dimmed" size="lg" mb="xl">
            Search, filter, and deep dive into any anime powered by the Jikan API.
          </Text>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
