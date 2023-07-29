'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Alert, Grid, Accordion } from '@mantine/core';

import SideNavbar from './_components/SideNavbar';
import HeaderBar from './_components/HeaderBar';
import PopularDoctors from './_components/PopularDoctors';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 400, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p={8}>
        <HeaderBar opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar pl={{ base: 5, lg: 200 }} pr={5} pb={5} pt={5}>
        <SideNavbar />
      </AppShell.Navbar>

      <AppShell.Main pr={{ base: 5, lg: 200 }} >
        <Grid>
          <Grid.Col span={{ base: 12, md: 8, lg:8.5 }}>Postlar yukleniyor...</Grid.Col>
          <Grid.Col
            display={{ base: 'none', md: 'block' }}
            span={{ base: 12, md: 4, lg:3.5 }}
          >
            <PopularDoctors />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
