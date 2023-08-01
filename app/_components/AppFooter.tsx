import { Group, SimpleGrid } from '@mantine/core';
import {
  IconHome,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

// TODO: link icon fill on click

const menuItems = [
  { icon: <IconHome size={26} />, label: 'Ana Sayfa', href: '/' },
  { icon: <IconSearch size={26} />, label: 'Ara', href: '#' },
  { icon: <IconPhoto size={26} />, label: 'Fotolar', href: '#' },
  { icon: <IconMessageCircle size={26} />, label: 'Mesajlar', href: '#' },
  { icon: <IconTrash size={26} />, label: 'Çöp', href: '#' },
  { icon: <IconArrowsLeftRight size={26} />, label: 'Ayarlar', href: '#' },
];

export default function AppFooter() {
  return (
    <>
      <Group justify='space-between' py={15} px={30}>
        {menuItems.map((item, index) => (
            <Group key={index} justify='center' align='center'>
                {item.icon}
            </Group>
        ))}
      </Group>
    </>
  );
}
