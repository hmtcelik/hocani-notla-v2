'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Group } from '@mantine/core';
import { IconHome, IconSearch, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import Link from 'next/link';

export default function AppFooter() {
  const pathname = usePathname();
  const [homeFill, setHomeFill] = useState<string>((pathname === '/') ? 'black' : 'none')

  useEffect(() => {
    (pathname === '/') ? setHomeFill('black') : setHomeFill('none')
  }, [pathname]);

  const menuItems = [
    { icon: <IconHome size={26} fill={homeFill} color='black'/>, label: 'Ana Sayfa', href: '/' },
    { icon: <IconSearch size={26} color='black' />, label: 'Ara', href: '#' },
    { icon: <IconMessageCircle size={26} color='black' />, label: 'Mesajlar', href: '#' },
    { icon: <IconSettings size={26} color='black' />, label: 'Ayarlar', href: '#' },
  ];

  return (
    <>
      <Group justify="space-between" py={15} px={30}>
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} color='black'>
            <Group justify="center" align="center">
                {item.icon}
            </Group>
          </Link>
        ))}
      </Group>
    </>
  );
}
