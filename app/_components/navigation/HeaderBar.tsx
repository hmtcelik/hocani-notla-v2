import { Button, Container, Group, Title } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';

export default function HeaderBar() {
  return (
    <>
      <Container size="xl">
        <Group py={30} justify="space-between">
          <Group>
            <IconBrandInstagram />
            <IconBrandTwitter />
          </Group>
          <Group>
            <Button px={25} radius="xl" color="black">
              Giriş Yap
            </Button>
          </Group>
        </Group>
      </Container>
    </>
  );
}
