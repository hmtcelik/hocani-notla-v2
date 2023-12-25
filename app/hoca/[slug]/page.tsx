'use client';

import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  collection,
  doc,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';
import Link from 'next/link';

import RatePost from '@/app/_components/post/RatePost';
import { CommentType } from '@/app/_models/Comment';
import { HocaType } from '@/app/_models/Hoca';
import Config from '@/app/_services/Config';
import initFirebase from '@/app/_services/InitService';
import {
  useFirestoreDocument,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import { IconEdit, IconPencilPlus, IconStar } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useQueryClient } from 'react-query';
import { openAuthModal } from '../../_components/auth/AuthModal'; // Adjust the path accordingly
import Loading from './loading';
import { useState } from 'react';

export default function Hoca({ params }: { params: { slug: string } }) {
  initFirebase();

  const session = useSession();
  const user = session?.data?.user || null;

  const ref = doc(
    collection(getFirestore(), Config.collections.hoca),
    params.slug
  );

  const commentsRef = query(
    collection(
      getFirestore(),
      Config.collections.hoca,
      params.slug,
      Config.collections.comments
    ),
    where('commenter', '!=', user?.id || ''),
    limit(5)
    // TODO: add pagination
  );

  const userCommentRef = query(
    collection(
      getFirestore(),
      Config.collections.hoca,
      params.slug,
      Config.collections.comments
    ),
    where('commenter', '==', user?.id || ''),
    limit(1)
  );

  const queryData = useFirestoreDocument(
    [`/hoca/${params.slug}`],
    ref,
    { subscribe: false },
    {}
  );

  const queryComments = useFirestoreQuery(
    ['hoca', params.slug, 'comments'],
    commentsRef,
    { subscribe: false }
  );

  const queryUserComment = useFirestoreQuery(
    ['hoca', params.slug, 'comments', user?.id],
    userCommentRef,
    { subscribe: false }
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

  // TODO: load only comment section instead of all page
  if (queryComments.isLoading) {
    return <Loading />;
  }

  if (queryComments.isError) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Text c="red">Bir hata oluştu.</Text>
        </Group>
      </Container>
    );
  }

  const commentsSnap = queryComments.data;
  if (!commentsSnap?.docs) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Text c="red">Hoca Bulunamadı.</Text>
        </Group>
      </Container>
    );
  }

  const comments: CommentType[] = commentsSnap.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as CommentType
  );

  const averageRate =
    comments.length > 0
      ? comments.reduce((acc, comment) => acc + comment.rate, 0) /
        comments.length
      : 0;

  // TODO: refactor this (add this values into document (hoca) )
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

  let userComment: CommentType | null = null;
  const userCommentSnap = queryUserComment.data;
  if (userCommentSnap?.docs) {
    const userCommentDoc = userCommentSnap.docs[0];
    userComment = {
      id: userCommentDoc.id,
      ...userCommentDoc.data(),
    } as CommentType;
  }

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
                px={40}
                size="lg"
                fz="sm"
                leftSection={!userComment ? <IconPencilPlus /> : <IconEdit />}
                onClick={() => openAuthModal()}
              >
                {!userComment ? 'Bu Hocaya Not Ver' : 'Notumu Düzenle'}
              </Button>
            ) : (
              <Link href={`/hoca/${params.slug}/rate`}>
                <Button
                  color="#0255FD"
                  radius="xl"
                  mr="auto"
                  px={40}
                  leftSection={!userComment ? <IconPencilPlus /> : <IconEdit />}
                  size="lg"
                  fz="sm"
                >
                  {!userComment ? 'Bu Hocaya Not Ver' : 'Notumu Düzenle'}
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
              {userComment && (
                <Stack gap={10}>
                  <Text fs="italic" size="sm" fw="bold">
                    Senin Notun:
                  </Text>
                  <RatePost
                    rate={userComment}
                    handleDislike={() => null}
                    handleLike={() => null}
                  />
                  <Divider mt={10} />
                </Stack>
              )}
              {comments.map((item, index) => (
                <div key={index}>
                  <RatePost
                    rate={item}
                    handleDislike={() => null}
                    handleLike={() => null}
                  />
                </div>
              ))}
              {comments.length <= 0 && !userComment && (
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
