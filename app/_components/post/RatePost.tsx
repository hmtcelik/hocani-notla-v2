'use client';

import { Button, Grid, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import {
  Icon360,
  IconAbc,
  IconAlphabetCyrillic,
  IconCheck,
  IconCurrencyRupeeNepalese,
  IconDeviceLaptop,
  IconFlag,
  IconH1,
  IconMathSymbols,
  IconRecycle,
  IconRecycleOff,
  IconRun,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import ScoreAvatar from './ScoreAvatar';
import { CommentType } from '@/app/_models/Comment';
import { IconReceipt } from '@tabler/icons-react';

interface RatePostProps {
  rate: CommentType;
}

const RatePost = ({ rate }: RatePostProps) => {
  return (
    <>
      <Stack p={20} gap={5} bg="#f1f1f166">
        <Stack gap={20}>
          <Stack gap={20}>
            <Group justify="space-between">
              <Group gap={15}>
                <Group gap={0}>
                  {[...Array(rate.rate)].map((_, index) => (
                    <IconStar size={22} fill="#f5b237" color="#f5b237" />
                  ))}
                  {[...Array(5 - rate.rate)].map((_, index) => (
                    <IconStar size={22} color="#bebebe" />
                  ))}
                </Group>
                {/* <Text>{rate.rate}</Text> */}
              </Group>
              <Group gap={10}>
                {rate.again !== null && (
                  <Text fz={14}>
                    Tekrar Alır mıydın?:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {rate.again ? (
                        <IconCheck color="green" stroke={4} />
                      ) : (
                        <IconX color="red" stroke={4} />
                      )}
                    </span>
                  </Text>
                )}
                {rate.attandance !== null && (
                  <Text fz={14}>
                    Yoklama:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {rate.attandance ? (
                        <IconCheck color="green" stroke={4} />
                      ) : (
                        <IconX color="red" stroke={4} />
                      )}
                    </span>
                  </Text>
                )}
                {rate.online !== null && (
                  <Text fz={14}>
                    Eğitim:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {rate.online === 'online' ? (
                        <IconDeviceLaptop />
                      ) : rate.online === 'hybrid' ? (
                        <>
                          <Icon360 />
                        </>
                      ) : (
                        <IconUsers />
                      )}
                    </span>
                  </Text>
                )}
                <Text fz={14}>
                  Not:{' '}
                  <span style={{ color: 'green', fontWeight: 900 }}>
                    {rate.grade}
                  </span>
                </Text>
              </Group>
            </Group>

            <Group justify="flex-start" align="flex-start" gap={5}>
              <Text fw={800}>{rate.course}</Text>
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
              {/* <Button
                styles={{
                  section: { marginRight: 3 },
                }}
                color="black"
                p={5}
                leftSection={<IconShare />}
                radius="sm"
                variant="subtle"
              /> */}
            </Group>
            <Group gap={3}>
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
              <Text fz={14} c="#00000090">
                20.10.2021
              </Text>
            </Group>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default RatePost;
