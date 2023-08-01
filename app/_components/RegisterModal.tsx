'use client';

import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Title, Text, Stack, Divider, Group } from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';

import GoogleAuthProvider from '../_providers/GoogleAuthProvider';

export default function RegisterModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <GoogleAuthProvider>
      <Modal opened={opened} onClose={close} title="" radius='xl' size="sm" centered closeOnClickOutside={false}>
        <Stack p={40} pt={10} className="login-form">
          <Title order={4}>Kayıt Ol</Title>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Register Failed');
            }}
            shape="circle"
            size="large"
            text="continue_with"
          />
          <Divider my="xs" label="veya" fz={20} fw="bold" labelPosition="center" />
          <TextInput variant="filled" size="md" radius="xl" placeholder="Email" />
          <TextInput variant="filled" size="md" radius="xl" placeholder="Şifre" />
          <TextInput variant="filled" size="md" radius="xl" placeholder="Yeniden Şifre" />
          <Link href="#">
            <Button radius="xl" size="md" fz={15} fullWidth>
              Giriş Yap
            </Button>
          </Link>
          <Group gap={5}>
              <Text fz={13} c="black">
                Zaten bir hesabın var mı?
              </Text>
            <Link href="#">
              <Text fz={13} c="indigo" td='underline'>
                Giriş Yap
              </Text>
            </Link>
          </Group>
        </Stack>
      </Modal>
    </GoogleAuthProvider>
  );
}
