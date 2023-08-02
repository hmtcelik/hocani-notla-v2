import Link from 'next/link';
import { Button, Divider, Group, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export default function PostDetail() {
  return (
    <>
      <Group gap={12}>
        <Link href="/">
          <Button variant="light" color="gray" size="md" radius="xl">
            <IconArrowLeft />
          </Button>
        </Link>
        <Title order={3}>
          Yorum
        </Title>
      </Group>
      <Divider my={10} />
    </>
  );
}
