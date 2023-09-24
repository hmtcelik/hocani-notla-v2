'use client';

import { Menu, rem, ActionIcon } from '@mantine/core';
import { IconSettings, IconHelp, IconLogout } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

type Props = {
  color: string;
};

export default function SettingsMenu(props: Props) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon size={30} color={props.color} variant="transparent">
          <IconSettings />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Ayarlar</Menu.Label>
        {/* <Menu.Item
          leftSection={
            <IconPencil style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Notlarım
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLock style={{ width: rem(14), height: rem(14) }} />}
        >
          Şifremi Değiştir
        </Menu.Item> */}
        <Menu.Item
          leftSection={<IconHelp style={{ width: rem(14), height: rem(14) }} />}
        >
          Yardım İste
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => {
            signOut();
          }}
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Çıkış Yap
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
