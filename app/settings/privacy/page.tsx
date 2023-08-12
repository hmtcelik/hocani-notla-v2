import React from 'react';
import Link from 'next/link';
import {
  Avatar,
  Button,
  Divider,
  Text,
  TextInput,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconCheck, IconMail } from '@tabler/icons-react';

const AccountSettings = () => {
  return (
    <>
      <Group>
        <Link href="/settings/">
          <Button variant="light" color="gray" size="md" radius="xl">
            <IconArrowLeft />
          </Button>
        </Link>
        <Text fz={20}>Güvenlik ve Gizlilik</Text>
      </Group>
      <Divider my={20} />
      <Stack gap="lg">
        <Title order={3}>Eposta</Title>
        <TextInput
          variant="unstyled"
          size="lg"
          radius="md"
          readOnly
          value="abdulhamitcelik@gmail.com"
          leftSection={<IconMail />}
        />
        <Divider my={10} />
        <Title order={3}>Şifre</Title>
        <Button variant="outline" color="gray" size="lg" radius="md">
          Şifreyi Değiştir
        </Button>
        <Divider mt={30} mb={10} />
        <Title order={3}>Politikalar</Title>
        <Button variant="light" color="gray" size="lg" radius="md">
          Gizlilik Politikası
        </Button>
        <Button variant="light" color="gray" size="lg" radius="md">
          Kullanıcı Koşulları
        </Button>
        <Button variant="light" color="gray" size="lg" radius="md">
          Çerez Politikası
        </Button>
      </Stack>
    </>
  );
};

export default AccountSettings;
