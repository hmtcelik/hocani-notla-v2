import Image from 'next/image';
import Link from 'next/link';
import { Burger, Group, Container, Grid } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

import DoctorSearch from '../doctor/DoctorSearch';
import AuthModal from '../auth/AuthModal';

export default function HeaderBar() {
  return (
    // <Container size={1480}>
    <Grid align="center" justify="center" px={20}>
      <Grid.Col span={{ base: 0, xs: 4, md: 4, lg: 2.5 }}>
        <Group justify="start">
          <Group display={{ base: 'none', xs: 'block' }}>
            <Link href={'/'}>
              <p>Logo</p>
            </Link>
          </Group>
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 11, xs: 8, md: 8, lg: 6.5 }}>
        <Group grow>
          <DoctorSearch />
        </Group>
      </Grid.Col>
      <Grid.Col
        display={{ base: 'none', lg: 'block' }}
        span={{ base: 0, lg: 3 }}
      >
        <Group justify="flex-end">
          <AuthModal />
        </Group>
      </Grid.Col>
    </Grid>
    // </Container>
  );
}
