import Link from 'next/link';
import { Alert, Accordion } from '@mantine/core';
import { Avatar } from '@mantine/core';

const data = [
  { avatar:'', label: 'İlker Türker', value: '123456' },
  { avatar:'', label: 'Fehmi Akyol', value: '789012'},
  { avatar:'', label: 'Ali Vural',  value: '345678' },
  { avatar:'', label: 'Rahmiye Uslu', value: '901234' },
  { avatar:'', label: 'Tekin Özdemir', value: '567890' },
];

export default function PopularDoctors() {
  return (
    <Alert variant="light" bg={'#f9fafa'} color="gray" radius="md" title="Popüler Hocalar" p={10} style={{position:'fixed', maxWidth:300, width:'100%'}}>
      <Accordion defaultValue="popularItems" variant="filled" className="accordion">
        {data.map((item) => (
        <Link href={`/doctor/${item.value}`}>
          <Accordion.Item key={item.label} value={item.label} className="item">
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
          </Link>
        ))}
      </Accordion>
    </Alert>
  );
}
