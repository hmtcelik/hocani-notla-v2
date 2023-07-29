import { Grid, Avatar, Title, Text, Group, Button, Divider } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconMessageCircle, IconShare } from '@tabler/icons-react';

interface PostProps{
  id: number;
  author: string;
  username: string;
  text: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function Post(post: PostProps) {
  return (
    <>
      <Grid className="post" p={10}>
        <Grid.Col span={1}>
          <Group justify="center" align="flex-start">
            <Avatar radius="xl" size={46} />
          </Group>
        </Grid.Col>

        <Grid.Col span={11}>
          <Group justify='flex-start' gap={6} align='center'>
            <Title order={4} mb={5}>
              {post.author}
            </Title>
            <Divider orientation="vertical" size="xs" />
            <Text fz="sm" lh="sm" style={{color:'#666666'}}>
              @{post.username}
            </Text>
            <Text fz="sm" lh="sm" style={{color:'#666666'}}>
              {post.date}
            </Text>
          </Group>
          <Text fz="md" lh="sm">
            {post.text}
          </Text>

          <Group justify="flex-start" gap={'xs'} mt={15}>
            <Button variant="light" color="gray" radius="xl" size="xs">
              <Group justify="flex-start" gap={'xs'} style={{ color: '#666666' }}>
                <IconHeart size={20} />
                {post.likes}
              </Group>
            </Button>
            <Button variant="light" color="gray" radius="xl" size="xs">
              <Group justify="flex-start" gap={'xs'} style={{ color: '#666666' }}>
                <IconMessageCircle size={20} />
                {post.comments}
              </Group>
            </Button>
            <Button variant="light" color="gray" radius="xl" size="xs">
              <Group justify="flex-start" gap={'xs'} style={{ color: '#666666' }}>
                <IconShare size={20} />
                {post.shares}
              </Group>
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
      <Divider my="sm" color={'#0000001a'} />
    </>
  );
}
