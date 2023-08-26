import { Container, Group, Text } from '@mantine/core';
import Link from 'next/link';

const Footer = () => {
  return (
    <Container py={30} size="xl">
      <Group justify="space-between">
        <Text>© Hocanı Notla</Text>
        <Group>
          {['Gizlilik', 'Şartlar', 'Yardım'].map((item) => (
            <Link href="#">
              <Text>{item}</Text>
            </Link>
          ))}
        </Group>
      </Group>
    </Container>
  );
};

export default Footer;
