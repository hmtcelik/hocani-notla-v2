import Image from 'next/image';
import Link from 'next/link';
import { Burger, Group, Button, Grid } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

import DoctorSearch from './DoctorSearch';
import LoginModal from './LoginModal';

export default function HeaderBar() {
  return (
    <Grid align="center" justify="center" px={20}>
      <Grid.Col span={{ base: 0, xs: 4, md: 4, lg: 2.5 }}>
        <Group justify="start">
          <Group display={{ base: 'none', xs: 'block' }}>
            <Link href={'/'}>
              <Image
                key={'defaultlogo'}
                src={`/defaultlogo.png?${new Date().getTime()}`}
                width={120}
                height={30}
                alt="logo"
              />
            </Link>
          </Group>
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 11, xs: 8, md: 8, lg: 6.5 }}>
        <Group grow>
          <DoctorSearch />
        </Group>
      </Grid.Col>
      <Grid.Col display={{ base: 'none', lg: 'block' }} span={{ base: 0, lg: 3 }}>
        <Group justify="flex-end">
          <LoginModal />
          <Button variant="light" radius="lg">
            <IconSettings />
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
}
