import Image from 'next/image';
import Link from 'next/link';
import { Burger, Group, Button, Grid } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

import DoctorSearch from './DoctorSearch';

interface HeaderBarProps {
  opened: boolean;
  toggle: () => void;
}

export default function HeaderBar({ toggle, opened }: HeaderBarProps) {
  return (
    <Grid align="center" justify="center" px={20}>
      <Grid.Col span={{ base: 2, sm: 4, md: 4, lg: 2.5 }}>
        <Group justify="start">
          <Burger opened={opened} onClick={toggle} hiddenFrom="lg" size="md" />
          <Group display={{ base: 'none', sm: 'block' }}>
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
      <Grid.Col span={{ base: 10, sm: 8, md: 8, lg: 6.5 }}>
        <Group grow>
          <DoctorSearch />
        </Group>
      </Grid.Col>
      <Grid.Col display={{ base: 'none', lg: 'block' }} span={{ base: 3, lg: 3 }}>
        <Group justify="flex-end">
          <Button variant="filled" radius="lg">
            Giriş Yap
          </Button>
          <Button variant="light" radius="lg">
            <IconSettings />
          </Button>
        </Group>
      </Grid.Col>
    </Grid>
  );
}
