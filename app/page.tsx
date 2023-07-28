'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Alert, Grid, Accordion } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="md" />
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Accordion defaultValue="Apples">
          <Accordion.Item value="aa">
            <Accordion.Control
              styles={{
                icon: {
                  display: 'none',
                },
              }}
            >
              {'aa'}
            </Accordion.Control>
            {/* <Accordion.Panel>{''}</Accordion.Panel> */}
          </Accordion.Item>
        </Accordion>
      </AppShell.Navbar>

      <AppShell.Main>
        <Grid>
          <Grid.Col span={{ base: 12, md: 12, lg: 9 }}>1</Grid.Col>
          <Grid.Col display={{ base: 'none', lg: 'block' }} span={{ base: 12, md: 12, lg: 3 }}>
            <Alert variant="light" color="gray" radius="xl" title="">
              Lorem ipsum dolor sit, a met consecteturit. At officiis, quae tempore necessitatibus placeat saepe.
            </Alert>
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
