'use client';

import { Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { IconDeviceLaptop } from '@tabler/icons-react';
import ScoreAvatar from './ScoreAvatar';

const RatePost = () => {
  return (
    <>
      <Stack p={20} gap={5} bg="#f1f1f166">
        <Grid>
          <Grid.Col span={1.5}>
            <ScoreAvatar score={5} size={70} fz={32} />
          </Grid.Col>
          <Grid.Col span={10.5}>
            <Stack gap={10}>
              <Group justify="flex-start" align="flex-start" gap={5}>
                <span title="Online Eğitim">
                  <IconDeviceLaptop />
                </span>
                <Text fw={800}>MAT120</Text>
              </Group>
              <Group>
                <Text>
                  Tekrar Alır mıydın?:{' '}
                  <span style={{ fontWeight: 'bold' }}>Evet</span>
                </Text>
                <Text>
                  Yoklama: <span style={{ fontWeight: 'bold' }}>Zorunlu</span>
                </Text>
                <Text>
                  Not: <span style={{ fontWeight: 'bold' }}>FF</span>
                </Text>
              </Group>
              <Text mt={10} fz={18}>
                Berbat
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
};

export default RatePost;
