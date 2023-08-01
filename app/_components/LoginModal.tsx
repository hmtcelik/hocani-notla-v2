'use client';

import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Title, Text, Stack, Divider, Group } from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';

import GoogleAuthProvider from '../_providers/GoogleAuthProvider';

export default function LoginModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <GoogleAuthProvider>
      <Button variant="filled" radius="lg" onClick={open}>
        Giriş Yap
      </Button>
      <Modal opened={opened} onClose={close} title="" radius='xl' size="sm" centered closeOnClickOutside={false}>
        <Stack p={40} pt={10} className="login-form">
          <Title order={4}>Giriş Yap</Title>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            shape="circle"
            size="large"
            text="continue_with"
          />
          <Divider my="xs" label="veya" fz={20} fw="bold" labelPosition="center" />
          <TextInput variant="filled" size="md" radius="xl" placeholder="Email" />
          <TextInput variant="filled" size="md" radius="xl" placeholder="Şifre" />
          <Group>
            <Link href="#">
              <Text fz={13} c="black" td="underline">
                Şifreni mi unuttun ?
              </Text>
            </Link>
          </Group>
          <Link href="#">
            <Button radius="xl" size="md" fz={15} fullWidth>
              Giriş Yap
            </Button>
          </Link>
          <Group gap={5}>
              <Text fz={13} c="black">
                Hesabın yok mu?
              </Text>
            <Link href="#">
              <Text fz={13} c="indigo" td='underline'>
                Kayıt ol
              </Text>
            </Link>
          </Group>
        </Stack>
      </Modal>
    </GoogleAuthProvider>
  );
}
