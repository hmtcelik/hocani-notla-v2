import { BackgroundImage, Button, Container, Group } from '@mantine/core';
import { IconBrandInstagram, IconBrandTwitter } from '@tabler/icons-react';

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
              <Button px={25} radius="xl" color="black">
                Giriş Yap
              </Button>
            </Group>
          </Group>
        </Container>
      </BackgroundImage>
    </>
  );
}