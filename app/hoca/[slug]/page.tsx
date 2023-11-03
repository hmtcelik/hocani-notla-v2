'use client';

import {
  Button,
  Container,
  Flex,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { collection, doc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';

import RatePost from '@/app/_components/post/RatePost';
import { HocaType } from '@/app/_models/Hoca';
import Config from '@/app/_services/Config';
import HocaService from '@/app/_services/HocaService';
import initFirebase from '@/app/_services/InitService';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import {
  IconEdit,
  IconPencil,
  IconPencilBolt,
  IconPencilPlus,
  IconStar,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from 'react-query';
import { openAuthModal } from '../../_components/auth/AuthModal'; // Adjust the path accordingly
import Loading from './loading';

export default function Hoca({ params }: { params: { slug: string } }) {
  initFirebase();

  const session = useSession();
  const user = session?.data?.user || null;
  const client = useQueryClient();

  const userAttrRef = doc(
    collection(getFirestore(), Config.collections.userAttrs),
    user?.id
  );

  const userAttrQueryData = useFirestoreDocument(
    ['userAttrs', user?.id],
    userAttrRef,
    { subscribe: false },
    {}
  );

  const isAlreadyNot =
    userAttrQueryData.data?.exists() &&
    userAttrQueryData.data?.data()?.rates.includes(params.slug);

  const ref = doc(
    collection(getFirestore(), Config.collections.hoca),
    params.slug
  );

  const queryData = useFirestoreDocument(
    [`/hoca/${params.slug}`],
    ref,
    { subscribe: false },
    {}
  );

  if (queryData.isLoading) {
    return <Loading />;
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
      label: 'Cok Kötü',
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

  const handleLike = (index: number) => {
    if (user && user.id && data) {
      let newComment = comments;
      let likes = newComment[index].likes;
      let dislikes = newComment[index].dislikes;

      if (likes.includes(user.id)) {
        likes = likes.filter((item) => item !== user.id);
      } else {
        likes.push(user.id);
      }

      if (dislikes.includes(user.id)) {
        dislikes = dislikes.filter((item) => item !== user.id);
      }

      newComment[index].likes = likes;
      newComment[index].dislikes = dislikes;

      client.setQueryData(`/hoca/${params.slug}`, (old: any) => {
        let updatedObject = Object.assign(
          Object.create(Object.getPrototypeOf(old)),
          {
            ...old,
            data: () => {
              return {
                ...old.data(),
                comments: newComment,
              };
            },
          }
        );

        return updatedObject;
      });

      // update db
      HocaService.updateHocaComments(data.id, newComment).catch((err: any) => {
        console.log('Error when updating hoca: ', err);
      });
    } else {
      openAuthModal();
    }
  };

  const handleDislike = (index: number) => {
    if (user && user.id && data) {
      let newComment = comments;
      let likes = newComment[index].likes;
      let dislikes = newComment[index].dislikes;

      if (dislikes.includes(user.id)) {
        dislikes = dislikes.filter((item) => item !== user.id);
      } else {
        dislikes.push(user.id);
      }

      if (likes.includes(user.id)) {
        likes = likes.filter((item) => item !== user.id);
      }

      newComment[index].likes = likes;
      newComment[index].dislikes = dislikes;

      client.setQueryData(`/hoca/${params.slug}`, (old: any) => {
        let updatedObject = Object.assign(
          Object.create(Object.getPrototypeOf(old)),
          {
            ...old,
            data: () => {
              return {
                ...old.data(),
                comments: newComment,
              };
            },
          }
        );

        return updatedObject;
      });

      // update db
      HocaService.updateHocaComments(data.id, newComment).catch((err: any) => {
        console.log('Error when updating hoca: ', err);
      });
    } else {
      openAuthModal();
    }
  };

  return (
    <>
      <Container py={60} maw={1000}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20}>
          <Stack gap={20} justify="flex-start">
            <Stack gap={0}>
              <Title order={1} mt={18} fw={900} fz={42}>
                {data.name}
              </Title>
              <Text fz={14}>
                <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
                  {data.university}
                </span>
                &apos;nde{' '}
                <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
                  {data.department}
                </span>{' '}
                bölümünde öğretim görevlisi
              </Text>
            </Stack>
            {!user ? (
              <Button
                color="#0255FD"
                radius="xl"
                mr="auto"
                px={50}
                size="lg"
                fz="sm"
                onClick={() => openAuthModal()}
              >
                {!isAlreadyNot ? 'Bu Hocaya Not Ver' : 'Notumu Düzenle'}
              </Button>
            ) : (
              <Link href={`/hoca/${params.slug}/rate`}>
                <Button
                  color="#0255FD"
                  radius="xl"
                  mr="auto"
                  px={40}
                  leftSection={
                    !isAlreadyNot ? <IconPencilPlus /> : <IconEdit />
                  }
                  size="lg"
                  fz="sm"
                >
                  {!isAlreadyNot ? 'Bu Hocaya Not Ver' : 'Notumu Düzenle'}
                </Button>
              </Link>
            )}
          </Stack>
          <Stack p={20} pb={30} bg={'#F7F7F7'} justify="center" align="center">
            <Flex
              wrap="nowrap"
              w="100%"
              gap={10}
              direction={{ base: 'column', xs: 'row' }}
              justify="center"
            >
              <Group align="flex-start" gap={5}>
                <Title order={1} fw={900} fz={72}>
                  {averageRate.toFixed(1)}
                </Title>
                <Text c="gray" mt={20} fw="bold" fz={18}>
                  / 5
                </Text>
              </Group>
              <Stack gap={4} style={{ flexGrow: 1 }}>
                {rates.map((item, index) => (
                  <Group key={index} gap={10} w="100%">
                    <Group gap={0} w={60}>
                      {[...Array(item.value)].map((_, index) => (
                        <IconStar
                          key={index}
                          fill="#f5b237"
                          color="#f5b237"
                          size={12}
                        />
                      ))}
                    </Group>
                    <Progress
                      style={{ flexGrow: 1 }}
                      radius="xs"
                      color="#0255FD"
                      bg="#E4E4E4"
                      size="xl"
                      h={15}
                      value={item.ratio}
                    />
                    <Text fz={14} fw="bold" w={20}>
                      {item.count}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </Flex>
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
                  <RatePost
                    rate={item}
                    handleDislike={() => handleDislike(index)}
                    handleLike={() => handleLike(index)}
                  />
                </div>
              ))}
              {comments.length <= 0 && (
                <Text mt={20} ta="center">
                  İlk Not Veren{' '}
                  <Link href={`/hoca/${params.slug}/rate`}>Sen Ol!</Link>
                </Text>
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
