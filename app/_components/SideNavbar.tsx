import Link from 'next/link';
import { Accordion, Group } from '@mantine/core';
import { IconHome, IconSearch, IconMessageCircle, IconSettings } from '@tabler/icons-react';

// TODO: link icon fill on click

const menuItems = [
  { icon: <IconHome />, label: 'Ana Sayfa', href: '/' },
  { icon: <IconSearch />, label: 'Ara', href: '#' },
  { icon: <IconMessageCircle />, label: 'Mesajlar', href: '#' },
  { icon: <IconSettings />, label: 'Ayarlar', href: '#' },
];

export default function SideNavbar() {
  return (
    <Group justify="flex-end">
      <Accordion w={160} defaultValue="menuItems" variant="filled" className="accordion">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href}>
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
    </Group>
  );
}
