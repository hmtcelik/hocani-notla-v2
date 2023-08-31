import { BackgroundImage, Button, Container, Group } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';

import AuthModal from '../auth/AuthModal';

export default function IndexHeaderBar() {
  return (
    <>
      <BackgroundImage src="/bg/rrrepeat.svg">
        <Container size="xl">
          <Group py={30} justify="space-between">
            <Group>
              <IconBrandInstagram />
              <IconBrandTwitter />
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
