import { Alert, Accordion } from '@mantine/core';
import { Avatar } from '@mantine/core';

const data = [
  { avatar:'', label: 'İlker Türker' },
  { avatar:'', label: 'Fehmi Akyol' },
  { avatar:'', label: 'Ali Vural' },
  { avatar:'', label: 'Rahmiye Uslu' },
];

export default function PopularDoctors() {
  return (
    <Alert variant="light" bg={'#f9fafa'} color="gray" radius="md" title="Popüler Hocalar" p={10}>
      <Accordion defaultValue="popularItems" variant="filled">
        {data.map((item) => (
          <Accordion.Item key={item.label} value={item.label} className="accordion-item">
            <Accordion.Control
              styles={{
                chevron: {
                  display: 'none',
                },
              }}
              icon={<Avatar radius={'xl'} />}
            >
              {item.label}
            </Accordion.Control>
          </Accordion.Item>
        ))}
      </Accordion>
    </Alert>
  );
}
