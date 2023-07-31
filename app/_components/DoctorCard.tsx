import { Group, Title } from '@mantine/core';

export default function DoctorCard() {
  return (
    <Group>
      <Title order={4}>{doctor.uid}</Title>
    </Group>
  );
}

const doctor = {
  uid: '123456',
  branch: 'YABANCI DİLLER ANABİLİM DALI',
  department: 'YABANCI DİLLER BÖLÜMÜ',
  faculty: 'YABANCI DİLLER YÜKSEKOKULU',
  fullname: 'CEREN ÖNER',
  id: 226655,
  mail: '',
  professions: 'Eğitim Bilimleri ve Öğretmen Yetiştirme Temel Alanı, Yabancı Dil Eğitimi',
  title: 'ÖĞRETİM GÖREVLİSİ',
  university: 'KADİR HAS ÜNİVERSİTESİ',
};
