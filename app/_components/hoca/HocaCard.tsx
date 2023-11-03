'use client';

import {
  Button,
  Center,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBuilding, IconEdit, IconSchool } from '@tabler/icons-react';
import Link from 'next/link';

import { HocaType } from '@/app/_models/Hoca';
import ScoreAvatar from '../post/ScoreAvatar';

type modeTypes = 'create' | 'edit';

type CardModes = {
  buttonText: string;
  showScore: boolean;
};

const modes: { [modeTypes: string]: CardModes } = {
  create: {
    buttonText: 'Not Ver',
    showScore: true,
  },
  edit: {
    buttonText: 'Notumu Düzenle',
    showScore: true,
  },
};

type HocaCardProps = {
  data: HocaType | null;
  mode?: modeTypes;
};

export default function HocaCard({ data, mode = 'create' }: HocaCardProps) {
  const modeData = modes[mode];

  const infoTexts = [
    { icon: <IconBuilding />, text: data?.university || '' },
    { icon: <IconSchool />, text: data?.department || '' },
  ];

  return (
    <Grid
      p={20}
      gutter={0}
      bg="#f1f3f5"
      style={{ borderRadius: 20 }}
      justify="space-between"
    >
      <Grid.Col span={{ base: 10, xs: 10 }}>
        <Stack>
          <Link href={`/hoca/${data?.id}`}>
            <Title order={2}>
              {data?.title || ''} {data?.name || ''}
            </Title>
          </Link>
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
                {modeData.buttonText}
              </Button>
            </Link>
          </div>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
