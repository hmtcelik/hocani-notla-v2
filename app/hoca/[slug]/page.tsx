'use client';

import { Button, Divider, Grid, Group, Stack, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import HocaCard from '@/app/_components/hoca/HocaCard';
import AsideDoctors from '@/app/_components/hoca/AsideDoctors';
import HocaService from '@/app/_services/HocaService';
import { HocaType } from '@/app/_models/Hoca';
import { AuthContext } from '@/app/_providers/AuthProvider';
import { CommentType } from '@/app/_models/Comment';
import {
  IconStarFilled,
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from '@tabler/icons-react';
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
      <Grid grow>
        <Grid.Col span={{ base: 12, md: 8, lg: 8.8 }}>
          <HocaCard data={data} />
          <Divider my={20} size={'xs'} />
          {data?.comments.map((comment: CommentType, index) => (
            <Stack style={{ fontSize: 18 }} gap={3} key={index}>
              <div>
                <IconStarFilled /> {comment.rate}
              </div>
              <div>{comment.date.slice(0, 10)}</div>
              <div>
                Aldığım kurs <b>{comment.course}</b>
              </div>
              <div>
                Tekrar Alır mıydım? <b>{comment.again ? 'Evet' : 'Hayır'}</b>
              </div>
              <div>
                Yoklama Zorunlu mu?{' '}
                <b>{comment.attandance ? 'Evet' : 'Hayır'}</b>
              </div>
              <div>
                Notum <b>{comment.grade}</b>
              </div>
              <div>
                Eğitim Şekli <b>{comment.online}</b>
              </div>
              <div style={{ marginTop: 10 }}>{comment.comment}</div>
              <Group mt={5}>
                <Group
                  gap={2}
                  align="center"
                  onClick={() => handleLike(index)}
                  justify="center"
                >
                  <Button variant="light">
                    {comment.likes.includes(user?.uid || '') ? (
                      <IconThumbUpFilled />
                    ) : (
                      <IconThumbUp />
                    )}
                    <Text>{comment.likes.length}</Text>
                  </Button>
                </Group>
                <Group
                  gap={2}
                  align="center"
                  onClick={() => handleDislike(index)}
                  justify="center"
                >
                  <Button variant="light">
                    {comment.dislikes.includes(user?.uid || '') ? (
                      <IconThumbDownFilled />
                    ) : (
                      <IconThumbDown />
                    )}
                    <Text>{comment.dislikes.length}</Text>
                  </Button>
                </Group>
              </Group>
              <Divider my={20} size={'xs'} />
            </Stack>
          ))}
        </Grid.Col>
        <Grid.Col
          display={{ base: 'none', md: 'block' }}
          span={{ base: 12, md: 4, lg: 3.2 }}
        >
          <Stack style={{ position: 'fixed', maxWidth: 300, width: '100%' }}>
            <AsideDoctors title="Bu Bölümden" data={RELATED_DOCTORS} />
            <AsideDoctors
              title="Bu Üniversiteden"
              data={MORE_DOCTORS_FROM_UNI}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}

const RELATED_DOCTORS = [
  { score: 3.2, label: 'Ali Vural', value: '345678' },
  { score: 1.8, label: 'Rahmiye Uslu', value: '901234' },
  { score: 5, label: 'Tekin Özdemir', value: '567890' },
];

const MORE_DOCTORS_FROM_UNI = [
  { score: 4.6, label: 'İlker Türker', value: '123456' },
  { score: 3.2, label: 'Ali Vural', value: '345678' },
  { score: 1.8, label: 'Rahmiye Uslu', value: '901234' },
  { score: 5, label: 'Tekin Özdemir', value: '567890' },
];
