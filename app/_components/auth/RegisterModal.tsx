'use client';

import 'firebase/compat/auth';
import Link from 'next/link';
import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Button,
  TextInput,
  Title,
  Text,
  Stack,
  Divider,
  Group,
} from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';

import GoogleAuthProvider from '../../_providers/GoogleAuthProvider';
import AuthService from '@/app/_services/AuthService';
import { useState } from 'react';

export default function RegisterModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [passwdAgain, setPasswdAgain] = useState<string>('');

  const handleSubmit = () => {
    if (email !== '' && passwd !== '') {
      AuthService.signUp(email, passwd);
    }
  };

  return (
    <GoogleAuthProvider>
      <Modal
        opened={opened}
        onClose={close}
        title=""
        radius="xl"
        size="sm"
        centered
        closeOnClickOutside={false}
      >
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
          <Divider
            my="xs"
            label="veya"
            fz={20}
            fw="bold"
            labelPosition="center"
          />
          <form onSubmit={handleSubmit}>
            <TextInput
              variant="filled"
              size="md"
              radius="xl"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              variant="filled"
              size="md"
              radius="xl"
              placeholder="Şifre"
              onChange={(e) => setPasswd(e.target.value)}
            />
            <TextInput
              variant="filled"
              size="md"
              radius="xl"
              placeholder="Yeniden Şifre"
              onChange={(e) => setPasswdAgain(e.target.value)}
            />
          </form>
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
              <Text fz={13} c="indigo" td="underline">
                Giriş Yap
              </Text>
            </Link>
          </Group>
        </Stack>
      </Modal>
    </GoogleAuthProvider>
  );
}
