import Link from 'next/link';
import { Accordion } from '@mantine/core';
import {
  IconHome,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

const menuItems = [
  { icon: <IconHome />, label: 'Ana Sayfa', href: '/' },
  { icon: <IconSearch />, label: 'Ara', href: '#' },
  { icon: <IconPhoto />, label: 'Fotolar', href: '#' },
  { icon: <IconMessageCircle />, label: 'Mesajlar', href: '#' },
  { icon: <IconTrash />, label: 'Çöp', href: '#' },
  { icon: <IconArrowsLeftRight />, label: 'Ayarlar', href: '#' },
];

export default function SideNavbar() {
  return (
    <Accordion defaultValue="menuItems" variant="filled" className="accordion">
      {menuItems.map((item) => (
        <Link href={item.href}>
          <Accordion.Item key={item.label} value={item.label} className="item">
            <Accordion.Control
              styles={{
                chevron: {
                  display: 'none',
                },
              }}
              icon={item.icon}
            >
              {item.label}
            </Accordion.Control>
          </Accordion.Item>
        </Link>
      ))}
    </Accordion>
  );
}
