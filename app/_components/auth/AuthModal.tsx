'use client';

import {
  Button,
  Group,
  Loader,
  Modal,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';

import AuthService from '@/app/_services/AuthService';
import initFirebase from '@/app/_services/InitService';
import { signIn, signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import SettingsMenu from './SettingsMenu';

interface AuthModalProps {
  button: {
    label: string;
    variant: 'filled' | 'outline' | 'light' | 'gradient' | 'link' | 'default';
    color: string;
  };
}

let openModalFunction: (() => void) | null = null;
let closeModalFunction: (() => void) | null = null;

const setOpenModalFunction = (func: () => void) => (openModalFunction = func);
const setCloseModalFunction = (func: () => void) => (closeModalFunction = func);

export const openAuthModal = () => {
  if (openModalFunction) {
    openModalFunction();
  }
};

export const closeAuthModal = () => {
  if (closeModalFunction) {
    closeModalFunction();
  }
};

export default function LoginModal(props: AuthModalProps) {
  initFirebase();

  const path = usePathname();

  const session = useSession();
  const user = session?.data?.user || null;
  const [opened, { open, close }] = useDisclosure(false);

  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [registerOpen, setRegisterOpen] = useState<boolean>(false);

  setOpenModalFunction(() => {
    open();
    setLoginOpen(true);
  });
  setCloseModalFunction(() => {
    close();
    setLoginOpen(false);
    setRegisterOpen(false);
  });

  return (
    <>
      {!user ? (
        <>
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
        </>
      ) : (
        <Group>
          <Button
            px={20}
            radius="xl"
            color={props.button.color}
            variant={props.button.variant}
            onClick={() => {
              signOut({ callbackUrl: path, redirect: true });
            }}
          >
            Çıkış Yap
          </Button>
          <SettingsMenu color={props.button.color} />
        </Group>
      )}
    </>
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
  const path = usePathname();

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
    signIn('credentials', {
      email,
      password: passwd,
      callbackUrl: path,
      redirect: true, // TODO: can be redirect false to avoid refresh page
    })
      .then((signInMessage) => {
        signInMessage?.error
          ? notifications.show({
              message: signInMessage.error,
              color: 'red',
            })
          : windowCloser();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Stack p={40} pt={10} className="login-form">
      <Title order={3} fw={800}>
        Giriş Yap
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack gap={20}>
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
          fw="bold"
          style={{ cursor: 'pointer' }}
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
  const path = usePathname();

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
        signIn('credentials', {
          email,
          password: passwd,
          callbackUrl: path,
          redirect: true, // TODO: can be redirect false to avoid refresh page
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
      <Title order={3} fw={800}>
        Kayıt Ol
      </Title>
      <form onSubmit={handleSubmit}>
        <Stack gap={20}>
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
          fw="bold"
          td="underline"
          style={{ cursor: 'pointer' }}
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
