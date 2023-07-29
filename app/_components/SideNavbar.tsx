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
  { icon: <IconHome />, label: 'Ana Sayfa' },
  { icon: <IconSearch />, label: 'Ara' },
  { icon: <IconPhoto />, label: 'Fotolar' },
  { icon: <IconMessageCircle />, label: 'Mesajlar' },
  { icon: <IconTrash />, label: 'Çöp' },
  { icon: <IconArrowsLeftRight />, label: 'Ayarlar' },
];

export default function SideNavbar() {
  return (
    <Accordion defaultValue="menuItems" variant="filled">
      {menuItems.map((item) => (
        <Accordion.Item key={item.label} value={item.label} className="accordion-item">
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
      ))}
    </Accordion>
  );
}
