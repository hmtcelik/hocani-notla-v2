'use client';

import { Divider, Grid, Stack } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';

import HocaCard from '@/app/_components/hoca/HocaCard';
import AsideDoctors from '@/app/_components/hoca/AsideDoctors';
import HocaService from '@/app/_services/HocaService';
import { HocaType } from '@/app/_models/Hoca';
import { AuthContext } from '@/app/_providers/AuthProvider';

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
