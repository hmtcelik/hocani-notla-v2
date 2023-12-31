import { Accordion, Alert } from '@mantine/core';
import Link from 'next/link';
import ScoreAvatar from '../post/ScoreAvatar';

interface DoctorData {
  score: number;
  label: string;
  value: string;
}

interface AsideDoctorsProps {
  data: DoctorData[];
  title: string;
}

export default function AsideDoctors({ data, title }: AsideDoctorsProps) {
  return (
    <Alert
      variant="light"
      bg={'#f9fafa'}
      color="gray"
      radius="md"
      title={title}
      p={10}
    >
      <Accordion
        defaultValue="popularItems"
        variant="filled"
        className="accordion"
      >
        {data.map((item, index) => (
          <Link key={index} href={`/doctor/${item.value}`}>
            <Accordion.Item
              key={item.label}
              value={item.label}
              className="item"
            >
              <Accordion.Control
                styles={{
                  chevron: {
                    display: 'none',
                  },
                }}
                icon={<ScoreAvatar score={item.score} />}
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
