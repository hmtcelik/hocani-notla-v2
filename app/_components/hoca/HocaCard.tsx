'use client';

import { Title, Text, Grid, Group, Button, Stack, Loader } from '@mantine/core';
import { IconSchool, IconBuilding, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useContext } from 'react';

import ScoreAvatar from '../post/ScoreAvatar';
import { HocaType } from '@/app/_models/Hoca';
import useNotification from '@/app/_hooks/useNotification';

interface HocaCardProps {
  data: HocaType | null;
}

export default function HocaCard({ data }: HocaCardProps) {
  const showNotification = useNotification();

  const infoTexts = [
    { icon: <IconBuilding />, text: data?.university || '' },
    { icon: <IconSchool />, text: data?.department || '' },
  ];

  if (!data) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <Grid
      p={20}
      gutter={0}
      bg="#f9fafb"
      style={{ borderRadius: 20 }}
      justify="space-between"
    >
      <Grid.Col span={{ base: 6.5, xs: 8 }}>
        <Stack>
          <Title order={2}>
            {data?.title || ''} {data?.name || ''}
          </Title>
          {infoTexts.map((infoText, index) => (
            <Group key={index} gap={10}>
              {infoText.icon}
              <Text fz={14}>{infoText.text}</Text>
            </Group>
          ))}
          <div>
            <Link href={`/hoca/${data?.id}/rate/`}>
              <Button
                variant="filled"
                size="md"
                radius="xl"
                leftSection={<IconEdit />}
              >
                Not Ver
              </Button>
            </Link>
          </div>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 3.5, xs: 2 }}>
        <Group justify="flex-end">
          <ScoreAvatar fz={36} size={'xl'} score={1.78} />
        </Group>
      </Grid.Col>
    </Grid>
  );
}
