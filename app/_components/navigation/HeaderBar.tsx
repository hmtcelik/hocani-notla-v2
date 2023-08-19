'use client';

import Link from 'next/link';
import { Group, Grid, Button, Image } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useContext } from 'react';

import DoctorSearch from '../doctor/DoctorSearch';
import AuthModal from '../auth/AuthModal';
import AuthService from '@/app/_services/AuthService';
import { AuthContext } from '@/app/_providers/AuthProvider';

export default function HeaderBar() {
  const user = useContext(AuthContext);

  return (
    // <Container size={1480}>
    <Grid align="center" justify="center" px={20}>
      <Grid.Col span={{ base: 0, xs: 4, md: 4, lg: 2.5 }}>
        <Group justify="start">
          <Group display={{ base: 'none', xs: 'block' }}>
            <Link href={'/'}>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F%C3%BCr_Dummies_logo.svg/2560px-F%C3%BCr_Dummies_logo.svg.png"
                alt="logo"
                width={80}
                height={30}
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
      <Grid.Col
        display={{ base: 'none', lg: 'block' }}
        span={{ base: 0, lg: 3 }}
      >
        <Group justify="flex-end">
          {user ? (
            <Button
              radius="lg"
              onClick={() => {
                AuthService.logout()
                  .then(() => {
                    notifications.show({
                      message: 'Çıkış yapıldı',
                      color: 'teal',
                    });
                  })
                  .catch((error) => {
                    notifications.show({
                      message: 'Çıkış yapılırken bir hata oluştu',
                      color: 'red',
                    });
                  });
              }}
            >
              Logout
            </Button>
          ) : (
            <AuthModal />
          )}
        </Group>
      </Grid.Col>
    </Grid>
    // </Container>
  );
}
