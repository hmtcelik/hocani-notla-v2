'use client';

import { Button, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import {
  IconDeviceLaptop,
  IconFlag,
  IconShare,
  IconShare2,
  IconThumbDown,
  IconThumbUp,
} from '@tabler/icons-react';
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
            <Stack gap={20}>
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
              </Stack>
              <Text fz={16}>Berbat</Text>
              <Group justify="space-between">
                <Group gap={10}>
                  <Button
                    styles={{
                      section: { marginRight: 3 },
                    }}
                    color="black"
                    p={5}
                    leftSection={<IconThumbUp />}
                    radius="sm"
                    variant="subtle"
                  >
                    4
                  </Button>
                  <Button
                    styles={{
                      section: { marginRight: 3 },
                    }}
                    p={5}
                    color="black"
                    justify="space-evenly"
                    leftSection={<IconThumbDown />}
                    radius="sm"
                    variant="subtle"
                  >
                    1
                  </Button>
                </Group>
                <Group gap={3}>
                  <Button
                    styles={{
                      section: { marginRight: 3 },
                    }}
                    color="black"
                    p={5}
                    leftSection={<IconShare2 />}
                    radius="sm"
                    variant="subtle"
                  />
                  <Button
                    styles={{
                      section: { marginRight: 3 },
                    }}
                    color="black"
                    p={5}
                    leftSection={<IconFlag />}
                    radius="sm"
                    variant="subtle"
                  />
                </Group>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
};

export default RatePost;
