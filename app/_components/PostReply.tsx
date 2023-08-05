'use client';

import { Grid, Title, Text, Group, Button, Divider } from '@mantine/core';
import { IconHeart, IconMessageCircle, IconShare } from '@tabler/icons-react';
import { useState } from 'react';

export interface postReplyProps {
  id: number;
  postId: number;
  author: string;
  username: string;
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

export default function PostReply(reply: postReplyProps) {
  const [like, setLike] = useState<boolean>(reply.isLiked);
  const [likeCount, setLikeCount] = useState<number>(reply.likes);

  return (
    <>
      <Grid p={10} py={15} className="post reply">
        <Grid.Col span={{ base: 10, xs: 11 }}>
          <Group justify="flex-start" gap={6} align="center">
            <Title order={4} mb={5} c="black">
              {reply.username}
            </Title>
            <Divider orientation="vertical" size="xs" />
            <Text fz="sm" lh="sm" c="#666666">
              {reply.date}
            </Text>
          </Group>
          <Text fz="md" lh="sm" c="black">
            {reply.text}
          </Text>

          <Group justify="flex-start" gap="xs" mt={15}>
            <Button
              className="like"
              variant="light"
              color="gray"
              radius="xl"
              size="xs"
              onClick={(e) => {
                e.preventDefault();
                setLike(!like);
                setLikeCount(like ? likeCount - 1 : likeCount + 1);
              }}
            >
              <Group justify="flex-start" gap="xs">
                {like ? (
                  <>
                    <IconHeart size={20} fill="#ed111a" color="#ed111a" />{' '}
                    <Text fz={13} fw="bold" c="#ed111a" className="text">
                      {likeCount}
                    </Text>
                  </>
                ) : (
                  <>
                    <IconHeart size={20} />
                    <Text fz={13} fw="bold" className="text">
                      {likeCount}
                    </Text>
                  </>
                )}
              </Group>
            </Button>
            <Button
              className="comment"
              variant="light"
              color="gray"
              radius="xl"
              size="xs"
            >
              <Group justify="flex-start" gap="xs">
                <IconMessageCircle size={20} />
              </Group>
            </Button>
            {/* <Button
              className="share"
              variant="light"
              color="gray"
              radius="xl"
              size="xs"
              onClick={(e) => e.preventDefault()}
            >
              <Group justify="flex-start" gap="xs">
                <IconShare size={18} />
              </Group>
            </Button> */}
          </Group>
        </Grid.Col>
      </Grid>
      {/* <Divider my="sm" color={'#0000001a'} /> */}
    </>
  );
}
