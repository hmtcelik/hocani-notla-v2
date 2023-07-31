'use client'

import { Grid, Group, Stack } from '@mantine/core';

import AsideDoctors from './_components/AsideDoctors';
import Post from './_components/Post';

export default function Home() {
  return (
    <Grid grow>
      <Grid.Col span={{ base: 12, md: 8, lg:8.8 }}>
        {POSTS.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Grid.Col>
      <Grid.Col
        display={{ base: 'none', md: 'block' }}
        span={{ base: 12, md: 4, lg:3.2 }}
      >
        <Stack style={{position:'fixed', maxWidth:300, width:'100%'}}> 
          <AsideDoctors title='Popüler Hocalar' data={POPULAR_DOCTORS}/>  
        </Stack>
      </Grid.Col>
    </Grid>
);
}

const POSTS = [
  {
    id: 1,
    author: 'Mehmet Karadeniz',
    username: 'mehmet_k',
    text: "Bugün ders aldığım üniversite öğretmeninin öğretim tarzı gerçekten yetersizdi. Konuyu anlatmak yerine, sadece slaytları okudu ve pek fazla etkileşime girmedi. Öğrencilerin anlamasını sağlamak için daha interaktif ve katılımcı bir yaklaşım bekliyordum. Eğitimde etkili bir iletişim ve öğrencilere ilgi göstermek büyük önem taşıyor. Daha iyi bir öğrenme deneyimi için bazı değişiklikler yapılması gerektiğini düşünüyorum. #üniversite #öğretmen #derseleştirisi",
    date: '29-07-2023',
    likes: 25,
    comments: 8,
    shares: 3,
    doctor: 'Rahmiye Uslu',
    doctorId: '901234',
    university: 'Karabük Üniversitesi',
    score: 3.2,
  },
  {
    id: 2,
    author: 'Ayşe Demir',
    username: 'ayse_d',
    text: "Son araştırma projesinde üniversite öğretmenimizin geri bildirimlerinde yetersiz kaldığını düşünüyorum. Doğru yönlendirmeler almak ve daha iyi bir çalışma yapmak için öğrencilere daha detaylı ve açıklayıcı geri dönüşler vermesini beklerdik. Öğrencilerin gelişimini destekleyen konstrüktif eleştirilere ihtiyacı var. Umuyorum ki gelecekte daha nitelikli geri bildirimler alabiliriz. #araştırma #proje #üstüneeleştiri",
    date: '28-07-2023',
    likes: 50,
    comments: 15,
    shares: 5,
    doctor: 'Rahmiye Uslu',
    doctorId: '901234',
    university: 'Karabük Üniversitesi',
    score: 4,
  },
  {
    id: 3,
    author: 'Can Yılmaz',
    username: 'can_y',
    text: "Üniversite öğretmenlerimizden bazıları sınavlar sırasında çok fazla baskı ve stres yaratıyor. Öğrencilerin öğrendiklerini sergilemeleri ve başarılı olmaları önemli, ancak bunun sağlığına zarar verecek düzeyde olmaması gerekir. Daha adil ve öğrenci dostu bir sınav sistemi için çaba göstermelerini umuyorum. #üniversite #sınav #stres",
    date: '27-07-2023',
    likes: 35,
    comments: 12,
    shares: 4,
    doctor: 'Rahmiye Uslu',
    doctorId: '901234',
    university: 'Karabük Üniversitesi',
    score: 1.2,
  },
  {
    id: 4,
    author: 'Elif Akın',
    username: 'elif_a',
    text: "Üniversitede bazı öğretmenler, ders materyallerini güncellemek ve yeni teknolojilere entegre etmek konusunda yeterince ilerlemiyor gibi görünüyor. Eğitimde teknolojinin gücü tartışılmaz, bu yüzden öğrencilere daha modern ve etkileşimli bir öğrenme deneyimi sunmak için daha fazla çaba göstermeleri gerektiğini düşünüyorum. #eğitim #teknoloji #yenilik",
    date: '26-07-2023',
    likes: 42,
    comments: 18,
    shares: 7,
    doctor: 'Rahmiye Uslu',
    doctorId: '901234',
    university: 'Karabük Üniversitesi',
    score: 0.5,
  },
  {
    id: 5,
    author: 'Zeynep Kaya',
    username: 'zeynep_k',
    text: "Bazı üniversite öğretmenleri, öğrencilere geri bildirim sağlarken olumlu yanlarına daha fazla odaklanmalı. Eleştiri önemli, ancak övgü de motive edici ve öğrencilerin kendine güvenini artırıcı bir etkiye sahip olabilir. Daha dengeli bir geri bildirim yaklaşımı benimsemeleri, öğrenci başarısını olumlu yönde etkileyebilir. #geribildirim #övgü #motivasyon",
    date: '25-07-2023',
    likes: 55,
    comments: 25,
    shares: 9,
    doctor: 'Rahmiye Uslu',
    doctorId: '901234',
    university: 'Karabük Üniversitesi',
    score: 0,
  },
]


const POPULAR_DOCTORS = [
  { score:4.6, label: 'İlker Türker', value: '123456' },
  { score:2.6, label: 'Fehmi Akyol', value: '789012'},
  { score:3.2, label: 'Ali Vural',  value: '345678' },
  { score:1.8, label: 'Rahmiye Uslu', value: '901234' },
  { score:5, label: 'Tekin Özdemir', value: '567890' },
];
