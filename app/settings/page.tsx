import React from 'react';
import Link from 'next/link';
import { Group, SimpleGrid, Stack, Text } from '@mantine/core';
import {
  IconUser,
  IconChevronRight,
  IconLock,
  IconBell,
  IconLogout,
} from '@tabler/icons-react';

const Groups = [
  {
    icon: <IconUser size={24} />,
    title: 'Hesap',
    link: '/settings/account/',
  },
  {
    icon: <IconLock size={24} />,
    title: 'Güvenlik ve Gizlilik',
    link: '/settings/privacy',
  },
];

const LogoutGroup = {
  icon: <IconLogout size={24} />,
  title: 'Çıkış',
  link: '#',
};

const Settings = () => {
  return (
    <Stack gap="xs" className="settings">
      {Groups.map((group, index) => (
        <SettingGroup group={group} key={index} />
      ))}
      <SimpleGrid cols={{ base: 1, xs: 2, xl: 3 }} mt={10}>
        <SettingGroup group={LogoutGroup} className="logout" />
      </SimpleGrid>
    </Stack>
  );
};

interface GroupProps {
  group: {
    icon: React.ReactNode;
    title: string;
    link: string;
  };
  className?: string;
}

const SettingGroup = ({ group, className }: GroupProps) => {
  return (
    <Link href={group.link}>
      <Group
        p={18}
        className={`${className ? className : ''} card`}
        align="center"
        justify="space-between"
      >
        <Group align="center">
          {group.icon}
          <Text fz={18}>{group.title}</Text>
        </Group>
        <IconChevronRight />
      </Group>
    </Link>
  );
};

export default Settings;
