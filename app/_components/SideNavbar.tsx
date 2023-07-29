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
  { icon: <IconHome />, label: 'Home' },
  { icon: <IconSearch />, label: 'Search' },
  { icon: <IconPhoto />, label: 'Photos' },
  { icon: <IconMessageCircle />, label: 'Messages' },
  { icon: <IconTrash />, label: 'Trash' },
  { icon: <IconArrowsLeftRight />, label: 'Settings' },
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
