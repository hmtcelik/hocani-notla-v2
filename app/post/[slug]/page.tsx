'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

import PostDetailCard from '@/app/_components/post/PostDetailCard';
import PostReply from '@/app/_components/post/PostReply';
import AsideDoctors from '@/app/_components/hoca/AsideDoctors';

export default function PostDetail() {
  return (
    <>
      <Grid grow>
        <Grid.Col span={{ base: 12, md: 8, lg: 8.8 }}>
          <Group gap={12} mb={15}>
            <Link href="/">
              <Button variant="light" color="gray" size="md" radius="xl">
                <IconArrowLeft />
              </Button>
            </Link>
            <Text fz={20}>Yanıtlar</Text>
          </Group>
          <PostDetailCard {...post} />
          <Title my={15} order={3}>
            {postReply.length} Yanıt
          </Title>
          {postReply.map((reply) => (
            <PostReply {...reply} key={reply.id} />
          ))}
        </Grid.Col>
        <Grid.Col
          display={{ base: 'none', md: 'block' }}
          span={{ base: 12, md: 4, lg: 3.2 }}
        >
          <Stack style={{ position: 'fixed', maxWidth: 300, width: '100%' }}>
            <AsideDoctors title="Benzer Hocalar" data={OTHER_DOCTORS} />
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}

const post = {
  id: 1,
  author: 'Mehmet Karadeniz',
  username: 'mehmet_k',
  text: 'Bugün ders aldığım üniversite öğretmeninin öğretim tarzı gerçekten yetersizdi. Konuyu anlatmak yerine, sadece slaytları okudu ve pek fazla etkileşime girmedi. Öğrencilerin anlamasını sağlamak için daha interaktif ve katılımcı bir yaklaşım bekliyordum. Eğitimde etkili bir iletişim ve öğrencilere ilgi göstermek büyük önem taşıyor. Daha iyi bir öğrenme deneyimi için bazı değişiklikler yapılması gerektiğini düşünüyorum. #üniversite #öğretmen #derseleştirisi',
  date: '29-07-2023',
  likes: 25,
  comments: 8,
  isLiked: true,
  doctor: 'Rahmiye Uslu',
  doctorId: '901234',
  university: 'Karabük Üniversitesi',
  score: 3.2,
};

const postReply = [
  {
    id: 1,
    postId: 2,
    author: 'Ali Veli',
    username: 'aliveli',
    text: 'Ya ne anlatiyon sen ya',
    date: '29-07-2023',
    likes: 25,
    isLiked: false,
  },
  {
    id: 2,
    postId: 2,
    author: 'Fatma Aydin',
    username: 'aydinliyimfatma',
    text: 'aynen kardesim aras kargo ac',
    date: '29-07-2023',
    likes: 21,
    isLiked: false,
  },
  {
    id: 3,
    postId: 2,
    author: 'Fatih Turan',
    username: 'turrturr',
    text: 'baya hakli bu arada',
    date: '29-07-2023',
    likes: 25,
    isLiked: false,
  },
  {
    id: 1,
    postId: 2,
    author: 'Ali Veli',
    username: 'aliveli',
    text: 'Ya ne anlatiyon sen ya',
    date: '29-07-2023',
    likes: 25,
    isLiked: false,
  },
  {
    id: 2,
    postId: 2,
    author: 'Fatma Aydin',
    username: 'aydinliyimfatma',
    text: 'aynen kardesim aras kargo ac',
    date: '29-07-2023',
    likes: 21,
    isLiked: false,
  },
  {
    id: 3,
    postId: 2,
    author: 'Fatih Turan',
    username: 'turrturr',
    text: 'baya hakli bu arada',
    date: '29-07-2023',
    likes: 25,
    isLiked: false,
  },
  {
    id: 2,
    postId: 2,
    author: 'Fatma Aydin',
    username: 'aydinliyimfatma',
    text: 'aynen kardesim aras kargo ac',
    date: '29-07-2023',
    likes: 21,
    isLiked: false,
  },
  {
    id: 3,
    postId: 2,
    author: 'Fatih Turan',
    username: 'turrturr',
    text: 'baya hakli bu arada',
    date: '29-07-2023',
    likes: 25,
    isLiked: false,
  },
];

const OTHER_DOCTORS = [
  { score: 3.2, label: 'Ali Vural', value: '345678' },
  { score: 1.8, label: 'Rahmiye Uslu', value: '901234' },
  { score: 5, label: 'Tekin Özdemir', value: '567890' },
];
