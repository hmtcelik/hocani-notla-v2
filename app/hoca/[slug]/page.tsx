'use client';

import {
  Container,
  Grid,
  Group,
  SimpleGrid,
  Progress,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import HocaService from '@/app/_services/HocaService';
import { HocaType } from '@/app/_models/Hoca';
import { AuthContext } from '@/app/_providers/AuthProvider';
import useNotification from '@/app/_hooks/useNotification';

export default function Hoca({ params }: { params: { slug: string } }) {
  const user = useContext(AuthContext);

  const showNotification = useNotification();

  const [data, setData] = useState<HocaType | null>(null);

  useEffect(() => {
    HocaService.getHoca(params.slug)
      .then((d) => {
        setData(d as HocaType);
      })
      .catch((err) => {
        console.log('Error fetching data: ', err);
      });
  }, []);

  const handleLike = (index: number) => {
    if (user && data) {
      let newComment = data.comments;
      let likes = newComment[index].likes;
      let dislikes = newComment[index].dislikes;

      if (likes.includes(user.uid)) {
        likes = likes.filter((item) => item !== user.uid);
      } else {
        likes.push(user.uid);
      }

      if (dislikes.includes(user.uid)) {
        dislikes = dislikes.filter((item) => item !== user.uid);
      }

      newComment[index].likes = likes;
      newComment[index].dislikes = dislikes;

      // update dom
      setData({ ...data, comments: newComment });

      // update db
      HocaService.updateHocaComments(data.id, newComment).catch((err) => {
        console.log('Error when updating hoca: ', err);
      });
    } else {
      showNotification('error', 'Giriş yapınız.');
    }
  };

  const handleDislike = (index: number) => {
    if (user && data) {
      let newComment = data.comments;
      let dislikes = newComment[index].dislikes;
      let likes = newComment[index].likes;

      if (dislikes.includes(user.uid)) {
        dislikes = dislikes.filter((item) => item !== user.uid);
      } else {
        dislikes.push(user.uid);
      }

      if (likes.includes(user.uid)) {
        likes = likes.filter((item) => item !== user.uid);
      }

      newComment[index].dislikes = dislikes;
      newComment[index].likes = likes;

      // update dom
      setData({ ...data, comments: newComment });

      // update db
      HocaService.updateHocaComments(data.id, newComment).catch((err) => {
        console.log('Error when updating hoca: ', err);
      });
    } else {
      showNotification('error', 'Giriş yapınız.');
    }
  };

  return (
    <>
      <Container py={60} maw={1000}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20}>
          <Stack gap={0}>
            <Group>
              <SimpleGrid cols={2} spacing={10}>
                <Title order={1} fw={900} fz={76}>
                  2.3
                </Title>
                <Text c="gray" mt={20} fw="bold" fz={18}>
                  / 5
                </Text>
              </SimpleGrid>
            </Group>
            <Text fz={14} fw={500}>
              <span style={{ textDecoration: 'underline' }}>20 oy</span> bazında
              genel ortalaması
            </Text>
            <Title order={1} mt={20} fw={900} fz={42}>
              Can Alkan
            </Title>
          </Stack>
          <Stack p={25} pb={40} bg={'#F7F7F7'}>
            <Text fw={500} fz={18}>
              Verilen Notlar
            </Text>
            {rates.map((item, index) => (
              <Group key={index} wrap="nowrap">
                <Text miw={80} ta="right">
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
                  value={50}
                />
                <Text fw="bold">20</Text>
              </Group>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

const rates = [
  {
    label: 'Çok iyi',
    value: 5,
  },
  {
    label: 'İyi',
    value: 4,
  },
  {
    label: 'Orta',
    value: 3,
  },
  {
    label: 'Kötü',
    value: 2,
  },
  {
    label: 'Çok kötü',
    value: 1,
  },
];
