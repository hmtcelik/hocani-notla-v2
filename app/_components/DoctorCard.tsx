'use client'

import { Badge, Title, Text, Grid, Group } from '@mantine/core';
import { IconSchool, IconBuilding, IconBinaryTree2 } from '@tabler/icons-react';
import ScoreAvatar from './ScoreAvatar';


export default function DoctorCard() {
  const infoTexts = [
    { icon: <IconBuilding/>, text: doctor.university },
    { icon: <IconSchool/>, text: doctor.department },
    { icon: <IconBinaryTree2/>, text: doctor.branch },
  ]

  return (
    <Grid p={20} gutter={0} bg='#f9fafb' style={{borderRadius:20}} justify='space-between'>
      <Grid.Col span={{base:6.5, xs:8}}>
          <Title py={12} order={2}>{doctor.title} {doctor.fullname}</Title>
          {infoTexts.map((infoText, index) => (
            <Group key={index} py={6} gap={10}>
              {infoText.icon}
              <Text fz={14} >{infoText.text}</Text>
            </Group>
          ))}
          <Group py={6} gap={3}>
            {doctor.professions.split(',').map((profession, index) => (
              <Badge key={index} size='lg' variant="light" color="#666666" title={profession}>{profession.slice(0,30)}{(profession.length > 30) ? '...' : ''}</Badge>
              ))}
          </Group>
      </Grid.Col>
      <Grid.Col span={{base:3.5, xs:2}}>
        <Group justify='flex-end'>
          <ScoreAvatar fz={36} size={'xl'} score={1.78} />
        </Group>
      </Grid.Col>
    </Grid>
  );
}

const doctor = {
  uid: '123456',
  branch: 'YABANCI DİLLER ANABİLİM DALI',
  department: 'YABANCI DİLLER BÖLÜMÜ',
  faculty: 'YABANCI DİLLER YÜKSEKOKULU',
  fullname: 'RAHMİYE USLU',
  id: 226655,
  mail: '',
  professions: 'Eğitim Bilimleri ve Öğretmen Yetiştirme Temel Alanı, Yabancı Dil Eğitimi',
  title: 'Öğr.',
  university: 'KADİR HAS ÜNİVERSİTESİ',
};
