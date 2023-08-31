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
  Loader,
} from '@mantine/core';
import { GoogleLogin } from '@react-oauth/google';

import GoogleAuthProvider from '../../_providers/GoogleAuthProvider';
import React, { useState } from 'react';
import AuthService from '@/app/_services/AuthService';

interface AuthModalProps {
  button: {
    label: string;
    variant: 'filled' | 'outline' | 'light' | 'gradient' | 'link' | 'default';
    color: string;
  };
}

export default function LoginModal(props: AuthModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  return (
    <GoogleAuthProvider>
      <Button
        px={20}
        radius="xl"
        color={props.button.color}
        variant={props.button.variant}
        onClick={() => {
          open();
          setLoginOpen(true);
        }}
      >
        {props.button.label}
      </Button>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          setLoginOpen(false);
          setRegisterOpen(false);
        }}
        title=""
        radius={0}
        size="sm"
        centered
        closeOnClickOutside={false}
        transitionProps={{ duration: 0 }}
        closeButtonProps={{ color: 'black' }}
      >
        {loginOpen && (
          <LoginForm
            setLoginOpen={setLoginOpen}
            setRegisterOpen={setRegisterOpen}
            windowCloser={close}
          />
        )}
        {registerOpen && (
          <RegisterForm
            setLoginOpen={setLoginOpen}
            setRegisterOpen={setRegisterOpen}
            windowCloser={close}
          />
        )}
      </Modal>
    </GoogleAuthProvider>
  );
}

function LoginForm({
  setLoginOpen,
  setRegisterOpen,
  windowCloser,
}: {
  setLoginOpen: Function;
  setRegisterOpen: Function;
  windowCloser: () => void;
}) {
  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwdError, setPasswdError] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(emailError === '' && passwdError === '')) {
      return;
    }

    setIsLoading(true);
    AuthService.signIn(email, passwd)
      .then((signInMessage) => {
        windowCloser();
      })
      .catch((signInError) => {
        notifications.show({
          message: signInError,
          color: 'red',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            variant="filled"
            size="md"
            radius="xl"
            placeholder="Email"
            type="email"
            onChange={(e) => {
              e.target.value === ''
                ? setEmailError('Email girmen lazım')
                : setEmailError('');
              setEmail(e.target.value);
            }}
            error={emailError}
            required
          />
          <TextInput
            variant="filled"
            size="md"
            radius="xl"
            placeholder="Şifre"
            type="password"
            onChange={(e) => {
              e.target.value === ''
                ? setPasswdError('Şifre girmen lazım')
                : setPasswdError('');
              setPasswd(e.target.value);
            }}
            error={passwdError}
            required
          />
          <Group>
            <Link href="#">
              <Text fz={13} c="black" td="underline">
                Şifreni mi unuttun ?
              </Text>
            </Link>
          </Group>
          <Button type="submit" radius="xl" size="md" fz={15} fullWidth>
            {isLoading ? (
              <Loader size="sm" color="white" />
            ) : (
              <Text fw="bold" fz="sm">
                Giriş Yap
              </Text>
            )}
          </Button>
        </Stack>
      </form>
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
  windowCloser,
}: {
  setLoginOpen: Function;
  setRegisterOpen: Function;
  windowCloser: () => void;
}) {
  const [email, setEmail] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const [passwdAgain, setPasswdAgain] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passwdError, setPasswdError] = useState<string>('');
  const [passwdAgainError, setPasswdAgainError] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwd !== passwdAgain) {
      setPasswdError('Şifreler Uyuşmadı');
      return;
    } else {
      setPasswdError('');
    }

    if (!(emailError === '' && passwdError === '' && passwdAgainError === '')) {
      return;
    }

    setIsLoading(true);
    AuthService.signUp(email, passwd)
      .then((signUpMessage) => {
        notifications.show({
          message: signUpMessage,
          color: 'teal',
        });
        windowCloser();
      })
      .catch((signUpError) => {
        notifications.show({
          message: signUpError,
          color: 'red',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            placeholder="Email"
            type="email"
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
            {isLoading ? (
              <Loader size="sm" color="white" />
            ) : (
              <Text fw="bold" fz="sm">
                Kayıt Ol
              </Text>
            )}
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
