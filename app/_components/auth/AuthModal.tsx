'use client';

import Link from 'next/link';
import { notifications } from '@mantine/notifications';
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
  PasswordInput,
} from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';

import GoogleAuthProvider from '../../_providers/GoogleAuthProvider';
import React, { useState } from 'react';
import AuthService from '@/app/_services/AuthService';

export default function LoginModal() {
  const [opened, { open, close }] = useDisclosure(false);

  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  return (
    <GoogleAuthProvider>
      <Button
        variant="filled"
        radius="lg"
        onClick={() => {
          open();
          setLoginOpen(true);
        }}
      >
        Giriş Yap
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setLoginOpen(false);
          setRegisterOpen(false);
        }}
        title=""
        radius="xl"
        size="sm"
        centered
        closeOnClickOutside={false}
        transitionProps={{ duration: 0 }}
      >
        {loginOpen && (
          <LoginForm
            setLoginOpen={setLoginOpen}
            setRegisterOpen={setRegisterOpen}
          />
        )}
        {registerOpen && (
          <RegisterForm
            setLoginOpen={setLoginOpen}
            setRegisterOpen={setRegisterOpen}
          />
        )}
      </Modal>
    </GoogleAuthProvider>
  );
}

function LoginForm({
  setLoginOpen,
  setRegisterOpen,
}: {
  setLoginOpen: Function;
  setRegisterOpen: Function;
}) {
  return (
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
        text="signin_with"
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
        <Text
          fz={13}
          c="indigo"
          td="underline"
          onClick={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
          }}
          className="info"
        >
          Kayıt ol
        </Text>
      </Group>
    </Stack>
  );
}

function RegisterForm({
  setLoginOpen,
  setRegisterOpen,
}: {
  setLoginOpen: Function;
  setRegisterOpen: Function;
}) {
  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [passwdAgain, setPasswdAgain] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passwdError, setPasswdError] = useState<string>('');
  const [passwdAgainError, setPasswdAgainError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let isFormValid = false;

    if (passwd !== passwdAgain) {
      setPasswdError('Şifreler Uyuşmadı');
    } else {
      setPasswdError('');
    }

    if (emailError === '' && passwdError === '' && passwdAgainError === '') {
      isFormValid = true;
    } else {
      isFormValid = false;
    }

    if (isFormValid) {
      let signUpError = AuthService.signUp(email, passwd);
      if (signUpError === '') {
        setLoginOpen(true);
        setRegisterOpen(false);
        notifications.show({
          message: 'Kayıt Başarılı',
          color: 'teal',
        });
      } else {
        notifications.show({
          message: signUpError,
          color: 'red',
        });
      }
    } else {
      e.preventDefault();
    }
  };

  return (
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
        text="signup_with"
      />
      <Divider my="xs" label="veya" fz={20} fw="bold" labelPosition="center" />
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            variant="filled"
            size="md"
            radius="xl"
            placeholder="Kullanıcı Adı"
            onChange={(e) => {}}
          />
          <TextInput
            variant="filled"
            size="md"
            radius="xl"
            placeholder="Email"
            required
            error={emailError}
            onChange={(e) => {
              e.target.value === ''
                ? setEmailError('Email girmen lazım')
                : setEmailError('');
              setEmail(e.target.value);
            }}
          />
          <PasswordInput
            variant="filled"
            size="md"
            radius="xl"
            placeholder="Şifre"
            required
            error={passwdError}
            onChange={(e) => {
              e.target.value === ''
                ? setPasswdError('Şifre girmen lazım')
                : setPasswdError('');
              setPasswd(e.target.value);
            }}
          />
          <PasswordInput
            variant="filled"
            size="md"
            radius="xl"
            placeholder="Yeniden Şifre"
            required
            error={passwdAgainError}
            onChange={(e) => {
              e.target.value === ''
                ? setPasswdAgainError('Şifreyi tekrar girmen lazım')
                : setPasswdAgainError('');
              setPasswdAgain(e.target.value);
            }}
          />

          <Button type="submit" radius="xl" size="md" fz={15} fullWidth>
            Kayıt Ol
          </Button>
        </Stack>
      </form>
      <Group gap={5}>
        <Text fz={13} c="black">
          Zaten bir hesabın var mı?
        </Text>
        <Text
          fz={13}
          c="indigo"
          td="underline"
          onClick={() => {
            setLoginOpen(true);
            setRegisterOpen(false);
          }}
          className="info"
        >
          Giriş Yap
        </Text>
      </Group>
    </Stack>
  );
}
