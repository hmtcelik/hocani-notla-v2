'use client';

import { useRouter } from 'next/navigation';
import { Grid, Title, Text, Group, Button, Divider } from '@mantine/core';
import {
  IconHeart,
  IconArrowForward,
  IconMessageCircle,
  IconShare,
} from '@tabler/icons-react';
import ScoreAvatar from './ScoreAvatar';
import { useState } from 'react';
import Link from 'next/link';

export interface PostProps {
  id: number;
  username: string;
  text: string;
  date: string;
  likes: number;
  isLiked: boolean;
  comments: number;
  score: number;
  doctor?: string | null;
  doctorId?: string | null;
  university?: string | null;
}

const cardTitleTextColor = '#595959';

export default function Post(post: PostProps) {
  const router = useRouter();

  const [like, setLike] = useState<boolean>(post.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post.likes);

  return (
    <>
      <Link key={post.id} href={`/post/${post.id}`} className="non-decoration">
        <Grid p={10} py={15} className="post">
          {post.doctor && post.university && post.doctorId && (
            <>
              <Grid.Col span={{ base: 2, xs: 1 }}>
                <Group justify="flex-end" align="center">
                  <IconArrowForward size={18} color={cardTitleTextColor} />
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 10, xs: 11 }}>
                <Group
                  fs={'italic'}
                  justify="flex-start"
                  gap={6}
                  align="center"
                >
                  {/* <Link href={`/doctor/${post.doctorId}/`}> */}
                  <Text
                    className="doctor-link"
                    fz="sm"
                    lh="sm"
                    fw="bold"
                    c={cardTitleTextColor}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/doctor/${post.doctorId}/`);
                    }}
                  >
                    {post.doctor} - {post.university}
                  </Text>
                  {/* </Link> */}
                </Group>
              </Grid.Col>
            </>
          )}
          <Grid.Col span={{ base: 2, xs: 1 }}>
            <Group justify="flex-end" align="flex-start">
              <ScoreAvatar score={post.score} />
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 10, xs: 11 }}>
            <Group justify="flex-start" gap={6} align="center">
              <Title order={4} mb={5} c="black">
                {post.username}
              </Title>
              <Divider orientation="vertical" size="xs" />
              <Text fz="sm" lh="sm" c="#666666">
                {post.date}
              </Text>
            </Group>
            <Text fz="md" lh="sm" c="black">
              {post.text}
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
                  <Text fz={13} fw="bold" className="text">
                    {post.comments}
                  </Text>
                </Group>
              </Button>
              <Button
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
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
        <Divider my="sm" color={'#0000001a'} />
      </Link>
    </>
  );
}
