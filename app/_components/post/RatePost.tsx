'use client';

import { Button, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import {
  IconDeviceLaptop,
  IconFlag,
  IconShare2,
  IconThumbDown,
  IconThumbUp,
} from '@tabler/icons-react';
import ScoreAvatar from './ScoreAvatar';
import { CommentType } from '@/app/_models/Comment';

interface RatePostProps {
  rate: CommentType;
}

const RatePost = ({ rate }: RatePostProps) => {
  return (
    <>
      <Stack p={20} gap={5} bg="#f1f1f166">
        <Grid>
          <Grid.Col span={1.5}>
            <ScoreAvatar score={rate.rate} size={70} fz={32} />
          </Grid.Col>
          <Grid.Col span={10.5}>
            <Stack gap={20}>
              <Stack gap={10}>
                <Group justify="flex-start" align="flex-start" gap={5}>
                  {rate.online === 'online' && (
                    <span title="Online Eğitim">
                      <IconDeviceLaptop />
                    </span>
                  )}
                  <Text fw={800}>{rate.course}</Text>
                </Group>
                <Group>
                  {rate.again !== null && (
                    <Text>
                      Tekrar Alır mıydın?:{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {rate.again ? 'Evet' : 'Hayır'}
                      </span>
                    </Text>
                  )}
                  {rate.attandance !== null && (
                    <Text>
                      Yoklama:{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {rate.attandance ? 'Evet' : 'Hayır'}
                      </span>
                    </Text>
                  )}
                  {rate.online !== null && (
                    <Text>
                      Eğitim:{' '}
                      <span style={{ fontWeight: 'bold' }}>
                        {rate.online === 'online'
                          ? 'Online'
                          : rate.online === 'hybrid'
                          ? 'Hibrid'
                          : 'Yüzyüze'}
                      </span>
                    </Text>
                  )}
                  <Text>
                    Not:{' '}
                    <span style={{ fontWeight: 'bold' }}>{rate.grade}</span>
                  </Text>
                </Group>
              </Stack>
              <Text fz={16}>{rate.comment}</Text>
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
                    {rate.likes.length}
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
                    {rate.dislikes.length}
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
