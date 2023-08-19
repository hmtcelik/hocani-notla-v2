'use client';
import React, { useState, useEffect, createContext } from 'react';
import { Grid, Stack } from '@mantine/core';

import AsideDoctors from './_components/doctor/AsideDoctors';

import initFirebase from './_services/InitService';
import DoctorService from './_services/DoctorService';
import { Doctor } from './_models/Doctor';

initFirebase();

export default function Home() {
  const [data, setData] = useState<Doctor[] | null>(null);

  useEffect(() => {
    DoctorService.getRandom5Doctor().then((data) => {
      console.log('data: ', data);
      setData(data);
    });
  }, []);

  return (
    <Grid grow>
      <Grid.Col span={{ base: 12, md: 8, lg: 8.8 }}>
        {data && data.map((doctor) => <div>{doctor.fullname}</div>)}
      </Grid.Col>
      <Grid.Col
        display={{ base: 'none', md: 'block' }}
        span={{ base: 12, md: 4, lg: 3.2 }}
      >
        <Stack style={{ position: 'fixed', maxWidth: 260, width: '100%' }}>
          <AsideDoctors title="Popüler Hocalar" data={POPULAR_DOCTORS} />
        </Stack>
      </Grid.Col>
    </Grid>
  );
}
const POPULAR_DOCTORS = [
  { score: 4.6, label: 'İlker Türker', value: '123456' },
  { score: 2.6, label: 'Fehmi Akyol', value: '789012' },
  { score: 3.2, label: 'Ali Vural', value: '345678' },
  { score: 1.8, label: 'Rahmiye Uslu', value: '901234' },
  { score: 5, label: 'Tekin Özdemir', value: '567890' },
];
