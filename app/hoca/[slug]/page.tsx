'use client';

import {
  Container,
  Grid,
  Group,
  SimpleGrid,
  Slider,
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
          <Stack>
            <Group>
              <SimpleGrid cols={2} spacing={10}>
                <Title order={1} fw={900} fz={72}>
                  2.3
                </Title>
                <Text c="gray" mt={20} fw="bold" fz={18}>
                  / 5
                </Text>
              </SimpleGrid>
            </Group>
          </Stack>
          <Stack>
            <Grid>
              <Grid.Col span={{ base: 4, sm: 2 }}>
                <Text>Cok iyi</Text>
              </Grid.Col>
              <Grid.Col span={{ base: 8, sm: 10 }}>
                <Slider
                  color="blue"
                  label="Slider"
                  size="lg"
                  showLabelOnHover={false}
                  value={50}
                  styles={{ thumb: { display: 'none' } }}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}
