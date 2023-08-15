import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Divider,
  Text,
  TextInput,
  Textarea,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconAt, IconMail } from '@tabler/icons-react';

const AccountSettings = () => {
  return (
    <>
      <Group>
        <Link href="/settings/">
          <Button variant="light" color="gray" size="md" radius="xl">
            <IconArrowLeft />
          </Button>
        </Link>
        <Text fz={20}>Hesap</Text>
      </Group>
      <Divider my={20} />
      <Stack gap="lg">
        <Title order={4}>Profil</Title>
        <Group>
          <Avatar size={128} />
          <Text
            fz={16}
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Fotoğraf Yükle
          </Text>
        </Group>
        <TextInput
          variant="filled"
          size="md"
          radius="md"
          value="abdulhamit"
          leftSection={<IconAt />}
          label="Kullanıcı Adı"
        />
        <TextInput
          variant="filled"
          size="md"
          radius="md"
          value="abdulhamitcelik@gmail.com"
          label="Eposta"
          leftSection={<IconMail />}
        />
        <Textarea
          variant="filled"
          size="md"
          radius="md"
          label="Bio"
          value="Merhaba, ben Abdulhamit Çelik. 20 yaşındayım ve İstanbul Üniversitesi Bilgisayar Mühendisliği 2. sınıf öğrencisiyim. Yazılım geliştirme ve tasarım alanlarında kendimi geliştirmeye çalışıyorum."
          maxLength={200}
        />
        <Divider />
        <Title order={4}>Hesap</Title>
        <Button variant="outline" color="gray" size="md" radius="md">
          Şifreyi Değiştir
        </Button>
        <Button variant="light" color="red" size="md" radius="md">
          Hesabı Sil
        </Button>
      </Stack>
    </>
  );
};

export default AccountSettings;
