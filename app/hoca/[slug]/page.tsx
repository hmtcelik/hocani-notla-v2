'use client';

import { Divider, Grid, Group, Stack, Text } from '@mantine/core';
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
  IconThumbUp,
} from '@tabler/icons-react';

export default function Hoca({ params }: { params: { slug: string } }) {
  const user = useContext(AuthContext);

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

  return (
    <>
      <Grid grow>
        <Grid.Col span={{ base: 12, md: 8, lg: 8.8 }}>
          <HocaCard data={data} />
          <Divider my={20} size={'xs'} />
          {data?.comments.map((comment: CommentType, index) => (
            <>
              <Stack style={{ fontSize: 18 }} gap={3}>
                <div>
                  <IconStarFilled /> {comment.rate}
                </div>
                <div>{comment.date.slice(0, 10)}</div>
                <div>Course: {comment.course}</div>
                <div>Again: {comment.again ? 'yes' : 'no'}</div>
                <div>Attandance: {comment.attandance ? 'yes' : 'no'}</div>
                <div>Grade: {comment.grade}</div>
                <div>Online: {comment.online}</div>
                <div style={{ marginTop: 10 }}>{comment.comment}</div>
                <Group>
                  <Group gap={2} align="center" justify="center">
                    <IconThumbUp />
                    <Text>{comment.like}</Text>
                  </Group>
                  <Group gap={2} align="center" justify="center">
                    <IconThumbUp />
                    <Text>{comment.dislike}</Text>
                  </Group>
                </Group>
                <Divider my={20} size={'xs'} />
              </Stack>
            </>
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
