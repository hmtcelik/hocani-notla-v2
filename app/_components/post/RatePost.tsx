'use client';

import { CommentType } from '@/app/_models/Comment';
import { Badge, Button, Group, Stack, Text } from '@mantine/core';
import {
  Icon360,
  IconCheck,
  IconDeviceLaptop,
  IconStar,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

interface RatePostProps {
  rate: CommentType;
  handleLike: () => void;
  handleDislike: () => void;
  isYourComment?: boolean;
}

const RatePost = ({ rate, handleLike, handleDislike }: RatePostProps) => {
  const session = useSession();
  const user = session?.data?.user || null;

  return (
    <>
      <Stack p={20} gap={5} bg="#f1f1f166">
        <Stack gap={20}>
          <Stack gap={15}>
            <Group justify="space-between">
              <Group gap={15}>
                <Group gap={0}>
                  {[...Array(rate.rate)].map((_, index) => (
                    <IconStar
                      key={index}
                      size={22}
                      fill="#f5b237"
                      color="#f5b237"
                    />
                  ))}
                  {[...Array(5 - rate.rate)].map((_, index) => (
                    <IconStar key={index} size={22} color="#bebebe" />
                  ))}
                </Group>
                {/* <Text>{rate.rate}</Text> */}
              </Group>
              <Group gap={10}>
                {rate.again !== null && (
                  <Group gap={5} justify="center" align="flex-end">
                    <Badge
                      variant="light"
                      color="gray"
                      size="lg"
                      radius="lg"
                      rightSection={
                        rate.again ? (
                          <IconCheck color="gray" stroke={3} size={18} />
                        ) : (
                          <IconX color="gray" stroke={3} size={18} />
                        )
                      }
                    >
                      Tekrar Alır mıydın?:
                    </Badge>
                  </Group>
                )}
                {rate.attandance !== null && (
                  <Group gap={5} justify="center" align="flex-end">
                    <Badge
                      variant="light"
                      color="gray"
                      size="lg"
                      radius="lg"
                      rightSection={
                        rate.attandance ? (
                          <IconCheck color="gray" stroke={3} size={18} />
                        ) : (
                          <IconX color="gray" stroke={3} size={18} />
                        )
                      }
                    >
                      Yoklama:
                    </Badge>
                  </Group>
                )}
                {rate.online && (
                  <Group gap={5} justify="center" align="flex-end">
                    <Badge
                      variant="light"
                      color="gray"
                      size="lg"
                      radius="lg"
                      rightSection={
                        rate.online === 'online' ? (
                          <IconDeviceLaptop color="gray" stroke={3} size={18} />
                        ) : rate.online === 'hybrid' ? (
                          <>
                            <Icon360 color="gray" stroke={3} size={18} />
                          </>
                        ) : (
                          <IconUsers color="gray" stroke={3} size={18} />
                        )
                      }
                    >
                      Eğitim:
                    </Badge>
                  </Group>
                )}
                {rate.grade && (
                  <Badge
                    variant="light"
                    color="gray"
                    size="lg"
                    radius="lg"
                    rightSection={
                      <span style={{ color: 'gray', fontWeight: 700 }}>
                        {rate.grade}
                      </span>
                    }
                  >
                    Not:
                  </Badge>
                )}
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
                leftSection={
                  user?.id ? (
                    rate.likes.includes(user.id) ? (
                      <IconThumbUpFilled />
                    ) : (
                      <IconThumbUp />
                    )
                  ) : (
                    <IconThumbUp />
                  )
                }
                radius="sm"
                variant="subtle"
                onClick={() => {
                  handleLike();
                }}
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
                leftSection={
                  user?.id ? (
                    rate.dislikes.includes(user.id) ? (
                      <IconThumbDownFilled />
                    ) : (
                      <IconThumbDown />
                    )
                  ) : (
                    <IconThumbDown />
                  )
                }
                radius="sm"
                variant="subtle"
                onClick={() => {
                  handleDislike();
                }}
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
              {/* <Button
                styles={{
                  section: { marginRight: 3 },
                }}
                color="black"
                p={5}
                leftSection={<IconFlag />}
                radius="sm"
                variant="subtle"
              /> */}
              <Text fz={14} c="#00000090">
                {
                  // DD-MM-YYYY
                  new Date(rate.date).toLocaleDateString('tr-TR')
                }
              </Text>
            </Group>
          </Group>
        </Stack>
      </Stack>
    </>
  );
};

export default RatePost;
