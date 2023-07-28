'use client';

import Image from 'next/image'
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Alert, Grid, SimpleGrid, Group, Button } from '@mantine/core';
import SideNavbar from './_components/SideNavbar';

import { TextInput } from '@mantine/core';
import DefaultLogo from '../public/defaultlogo.png';
import { IconSettings, IconSearch } from '@tabler/icons-react';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 400,  breakpoint: 'lg', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Grid align='center' px={20}>
          <Grid.Col span={3}  >
            <Group justify='start'>
              <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="md" />
              <Image src={'/defaultlogo.png'} width={190} height={60} alt='logo'></Image> 
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group grow>
              <TextInput
                variant='filled'
                size="md"
                radius="lg"
                leftSection={<IconSearch />}
                placeholder="Input placeholder"
                className='navbar-search'
              />
            </Group>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group justify='end'>
              <Button variant="filled" radius="lg">Giriş Yap</Button>
              <Button variant="light" radius="lg"><IconSettings></IconSettings></Button>
            </Group>
          </Grid.Col>
        </Grid>
      </AppShell.Header>

      <AppShell.Navbar pl={{'base':5, 'lg':200}} pr={5} pb={5} pt={5}>
        <SideNavbar />
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
