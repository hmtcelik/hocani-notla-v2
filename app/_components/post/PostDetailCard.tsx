'use client';

import { Button, Divider, Grid, Group, Text, Title } from '@mantine/core';
import {
  IconArrowForward,
  IconHeart,
  IconMessageCircle,
  IconShare,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PostProps } from './Post';
import ScoreAvatar from './ScoreAvatar';

const cardTitleTextColor = '#595959';

export default function PostDetailCard(post: PostProps) {
  const router = useRouter();

  const [like, setLike] = useState<boolean>(post.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post.likes);

  return (
    <>
      <Divider my="sm" color={'#0000001a'} />
      <Grid
        p={20}
        gutter={0}
        bg="#f9fafb"
        style={{ borderRadius: 20 }}
        justify="space-between"
        className="post reply"
      >
        <Grid.Col span={12} mb={15}>
          {post.doctor && post.university && post.doctorId && (
            <Group fs={'italic'} justify="flex-start" gap={6} align="center">
              <IconArrowForward size={18} color={cardTitleTextColor} />
              {/* <Link href={`/doctor/${post.doctorId}/`}> */}
              <Text
                className="doctor-link"
                fz={15}
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
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 8, xs: 10 }}>
          <Group justify="flex-start" mb={8} gap={6} align="center">
            <Title order={3} c="black">
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

          <Group justify="flex-start" gap="xs" mt={20}>
            <Button
              className="like"
              variant="light"
              color="gray"
              radius="xl"
              size="md"
              onClick={(e) => {
                e.preventDefault();
                setLike(!like);
                setLikeCount(like ? likeCount - 1 : likeCount + 1);
              }}
            >
              <Group justify="flex-start" gap="xs">
                {like ? (
                  <>
                    <IconHeart size={24} fill="#ed111a" color="#ed111a" />{' '}
                    <Text fz={16} fw="bold" c="#ed111a" className="text">
                      {likeCount}
                    </Text>
                  </>
                ) : (
                  <>
                    <IconHeart size={24} />
                    <Text fz={16} fw="bold" className="text">
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
              size="md"
            >
              <Group justify="flex-start" gap="xs">
                <IconMessageCircle size={24} />
                <Text fz={16} fw="bold" className="text">
                  {post.comments}
                </Text>
              </Group>
            </Button>
            <Button
              className="share"
              variant="light"
              color="gray"
              radius="xl"
              size="md"
              onClick={(e) => e.preventDefault()}
            >
              <Group justify="flex-start" gap="xs">
                <IconShare size={24} />
              </Group>
            </Button>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 4, xs: 2 }}>
          <Group justify="flex-end" align="flex-start">
            <ScoreAvatar score={post.score} size="xl" fz={32} />
          </Group>
        </Grid.Col>
      </Grid>
      <Divider my="sm" color={'#0000001a'} />
    </>
  );
}
