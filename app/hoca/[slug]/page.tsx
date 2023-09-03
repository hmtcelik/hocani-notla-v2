'use client';

import {
  Container,
  Group,
  SimpleGrid,
  Progress,
  Stack,
  Text,
  Title,
  Button,
  Tabs,
  Loader,
} from '@mantine/core';
import Link from 'next/link';
import { useContext } from 'react';
import { collection, doc, getFirestore } from 'firebase/firestore';

import { HocaType } from '@/app/_models/Hoca';
import { AuthContext } from '@/app/_providers/AuthProvider';
import useNotification from '@/app/_hooks/useNotification';
import RatePost from '@/app/_components/post/RatePost';
import Config from '@/app/_services/Config';
import { useFirestoreDocument } from '@react-query-firebase/firestore';

export default function Hoca({ params }: { params: { slug: string } }) {
  const user = useContext(AuthContext);

  const ref = doc(
    collection(getFirestore(), Config.collections.hoca),
    params.slug
  );

  const queryData = useFirestoreDocument([`/hoca/${params.slug}`], ref, {}, {});
  if (queryData.isLoading) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Loader />
        </Group>
      </Container>
    );
  }

  if (queryData.isError) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Text c="red">Bir hata oluştu.</Text>
        </Group>
      </Container>
    );
  }

  const docSnap = queryData.data;

  if (!docSnap?.exists()) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Text c="red">Hoca Bulunamadı.</Text>
        </Group>
      </Container>
    );
  }

  const data: HocaType = {
    id: docSnap.id,
    ...docSnap.data(),
  } as HocaType;

  const comments = data.comments;
  const averageRate =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rate, 0) /
        comments.length
      : 0;

  const fiveCt = comments.filter((item) => item.rate === 5).length;
  const fourCt = comments.filter((item) => item.rate === 4).length;
  const threeCt = comments.filter((item) => item.rate === 3).length;
  const twoCt = comments.filter((item) => item.rate === 2).length;
  const oneCt = comments.filter((item) => item.rate === 1).length;

  const rates = [
    {
      label: 'Çok iyi',
      value: 5,
      count: fiveCt,
      ratio: (fiveCt / comments.length) * 100,
    },
    {
      label: 'İyi',
      value: 4,
      count: fourCt,
      ratio: (fourCt / comments.length) * 100,
    },
    {
      label: 'Orta',
      value: 3,
      count: threeCt,
      ratio: (threeCt / comments.length) * 100,
    },
    {
      label: 'Kötü',
      value: 2,
      count: twoCt,
      ratio: (twoCt / comments.length) * 100,
    },
    {
      label: 'Çok kötü',
      value: 1,
      count: oneCt,
      ratio: (oneCt / comments.length) * 100,
    },
  ];

  // const handleLike = (index: number) => {
  //   if (user && data) {
  //     let newComment = data.comments;
  //     let likes = newComment[index].likes;
  //     let dislikes = newComment[index].dislikes;

  //     if (likes.includes(user.uid)) {
  //       likes = likes.filter((item) => item !== user.uid);
  //     } else {
  //       likes.push(user.uid);
  //     }

  //     if (dislikes.includes(user.uid)) {
  //       dislikes = dislikes.filter((item) => item !== user.uid);
  //     }

  //     newComment[index].likes = likes;
  //     newComment[index].dislikes = dislikes;

  //     // update dom
  //     setData({ ...data, comments: newComment });

  //     // update db
  //     HocaService.updateHocaComments(data.id, newComment).catch((err) => {
  //       console.log('Error when updating hoca: ', err);
  //     });
  //   } else {
  //     showNotification('error', 'Giriş yapınız.');
  //   }
  // };

  // const handleDislike = (index: number) => {
  //   if (user && data) {
  //     let newComment = data.comments;
  //     let dislikes = newComment[index].dislikes;
  //     let likes = newComment[index].likes;

  //     if (dislikes.includes(user.uid)) {
  //       dislikes = dislikes.filter((item) => item !== user.uid);
  //     } else {
  //       dislikes.push(user.uid);
  //     }

  //     if (likes.includes(user.uid)) {
  //       likes = likes.filter((item) => item !== user.uid);
  //     }

  //     newComment[index].dislikes = dislikes;
  //     newComment[index].likes = likes;

  //     // update dom
  //     setData({ ...data, comments: newComment });

  //     // update db
  //     HocaService.updateHocaComments(data.id, newComment).catch((err) => {
  //       console.log('Error when updating hoca: ', err);
  //     });
  //   } else {
  //     showNotification('error', 'Giriş yapınız.');
  //   }
  // };

  return (
    <>
      <Container py={60} maw={1000}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20}>
          <Stack gap={0} justify="space-around">
            <Stack gap={0}>
              <Group>
                <SimpleGrid cols={2} spacing={10}>
                  <Title order={1} fw={900} fz={76}>
                    {averageRate.toFixed(1)}
                  </Title>
                  <Text c="gray" mt={20} fw="bold" fz={18}>
                    / 5
                  </Text>
                </SimpleGrid>
              </Group>
              <Text fz={14} fw={500}>
                <span style={{ textDecoration: 'underline' }}>
                  {comments.length} oy
                </span>{' '}
                bazında genel ortalaması
              </Text>
              <Title order={1} mt={18} fw={900} fz={42}>
                {data.name}
              </Title>
              <Text fz={14}>
                <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
                  {data.university}
                </span>
                'nde{' '}
                <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
                  {data.department}
                </span>{' '}
                bölümünde öğretim görevlisi
              </Text>
            </Stack>
            <Link href={`/hoca/${params.slug}/rate`}>
              <Button
                color="#0255FD"
                radius="xl"
                mr="auto"
                px={50}
                size="lg"
                fz="sm"
              >
                Bu Hocaya Not Ver
              </Button>
            </Link>
          </Stack>
          <Stack p={20} pb={30} bg={'#F7F7F7'}>
            <Text fw={500} fz={18}>
              Verilen Notlar
            </Text>
            {rates.map((item, index) => (
              <Group key={index} wrap="nowrap">
                <Text fz={14} miw={80} ta="right">
                  {item.label}
                  {`\u00A0`}
                  <b>{item.value}</b>
                </Text>
                <Progress
                  style={{ flexGrow: 1 }}
                  radius="xs"
                  color="#0255FD"
                  bg="#E4E4E4"
                  size="xl"
                  h={35}
                  w={300}
                  value={item.ratio}
                />
                <Text fz={14} fw="bold">
                  {item.count}
                </Text>
              </Group>
            ))}
          </Stack>
        </SimpleGrid>
        <Tabs mt={30} color="black" defaultValue="rates">
          <Tabs.List>
            <Tabs.Tab value="rates">{comments.length} yorum</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="rates">
            <Stack mt={20} gap={20}>
              {comments.map((item, index) => (
                <div key={index}>
                  <RatePost rate={item} />
                </div>
              ))}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
