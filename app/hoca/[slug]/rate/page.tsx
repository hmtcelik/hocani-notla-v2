'use client';

import {
  Rating,
  Stack,
  Textarea,
  Text,
  Button,
  Group,
  TextInput,
  Radio,
} from '@mantine/core';
import { IconStar, IconStarFilled, IconArrowLeft } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import HocaService from '@/app/_services/HocaService';
import useNotification from '@/app/_hooks/useNotification';
import { CommentType } from '@/app/_models/Comment';
import { AuthContext } from '@/app/_providers/AuthProvider';

const page = ({ params }: { params: { slug: string } }) => {
  const user = useContext(AuthContext);

  const hocaUid = params.slug;
  const router = useRouter();

  if (!user) {
    router.push(`/hoca/${hocaUid}/`);
  }

  const showNotification = useNotification();
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [again, setAgain] = useState('');
  const [attandance, setAttandance] = useState('');
  const [online, setOnline] = useState('');
  const [grade, setGrade] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      !rate ||
      !comment ||
      !again ||
      !attandance ||
      !online ||
      !grade ||
      !course
    ) {
      showNotification('error', 'Lütfen tüm alanları doldurunuz.');
      return;
    }

    const newComment: CommentType = {
      rate,
      comment,
      date: new Date().toISOString(),
      commenter: user?.uid || '',
      course,
      likes: [],
      dislikes: [],
      again: again === 'yes' ? true : false,
      attandance: attandance === 'yes' ? true : false,
      grade,
      online,
      flag: false,
      visible: true,
      survey_id: '',
    };

    HocaService.createComment(hocaUid, newComment)
      .then((res) => {
        showNotification('success', 'Yorumunuz kaydedildi.');
        router.push(`/hoca/${hocaUid}/`);
      })
      .catch((err) => {
        console.log(err);
        showNotification('error', 'Hata Oluştu.');
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack maw={900}>
          <Group>
            <Link href={`/hoca/${hocaUid}/`}>
              <Button variant="light" color="gray" radius="xl">
                <IconArrowLeft />
              </Button>
            </Link>
          </Group>
          <div>
            <Text>
              Puanın <span style={{ color: 'red' }}>*</span>
            </Text>
            <Rating
              defaultValue={0}
              onChange={setRate}
              emptySymbol={<IconStar color="#cbcbcb" fill="#cbcbcb" />}
              fullSymbol={<IconStarFilled style={{ color: '#f5b237' }} />}
            />
          </div>

          <TextInput
            radius="md"
            label="Aldığın Dersin Kodu"
            placeholder="Örn: MATH101"
            onChange={(e) => setCourse(e.currentTarget.value)}
            withAsterisk
          />

          <Radio.Group
            name="again"
            label="Bu hocayı tekar alır mıydın?"
            withAsterisk
            onChange={setAgain}
          >
            <Group mt="xs">
              <Radio value="yes" label="Evet" />
              <Radio value="no" label="Hayır" />
            </Group>
          </Radio.Group>

          <Radio.Group
            name="attandance"
            label="Yoklama Zorunlu mu?"
            onChange={setAttandance}
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="yes" label="Evet" />
              <Radio value="no" label="Hayır" />
            </Group>
          </Radio.Group>

          <Radio.Group
            name="online"
            label="Eğitim Şekli?"
            onChange={setOnline}
            withAsterisk
          >
            <Group mt="xs">
              <Radio value="onsite" label="Yüz yüze" />
              <Radio value="hybrid" label="Hibrid" />
              <Radio value="online" label="Online" />
            </Group>
          </Radio.Group>

          <TextInput
            radius="md"
            label="Aldığın harf notu"
            withAsterisk
            maxLength={1000}
            placeholder="Örn: AA, BA, CB, CC, DC, DD, FD, FF"
            onChange={(e) => setGrade(e.currentTarget.value)}
          />

          <Textarea
            radius="md"
            label="Yorumun"
            withAsterisk
            maxLength={1000}
            placeholder="Bir şeyler yaz..."
            onChange={(e) => setComment(e.currentTarget.value)}
          />
          <Group justify="flex-end">
            <Button
              type="submit"
              variant="light"
              color="teal"
              radius="lg"
              h={50}
              w={150}
            >
              Kaydet
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};

export default page;
