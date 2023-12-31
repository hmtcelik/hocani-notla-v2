import { BackgroundImage, Container, Group } from '@mantine/core';
import { IconBrandInstagram, IconBrandX } from '@tabler/icons-react';

import AuthModal from '../auth/AuthModal';

export default function IndexHeaderBar() {
  return (
    <>
      <BackgroundImage src="/bg/rrrepeat.svg">
        <Container size="xl">
          <Group py={30} justify="space-between">
            <Group>
              <IconBrandInstagram />
              <IconBrandX />
            </Group>
            <Group>
              <AuthModal
                button={{
                  color: 'black',
                  label: 'Giriş Yap',
                  variant: 'filled',
                }}
              />
            </Group>
          </Group>
        </Container>
      </BackgroundImage>
    </>
  );
}
