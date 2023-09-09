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
  Container,
  Loader,
} from '@mantine/core';
import { IconStar, IconStarFilled, IconArrowLeft } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  useFirestoreDocument,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { collection, doc, getFirestore } from 'firebase/firestore';

import useNotification from '@/app/_hooks/useNotification';
import Config from '@/app/_services/Config';
import { CommentType } from '@/app/_models/Comment';
import { AuthContext } from '@/app/_providers/AuthProvider';
import { HocaType } from '@/app/_models/Hoca';
import { useQueryClient } from 'react-query';

const Page = ({ params }: { params: { slug: string } }) => {
  const client = useQueryClient();

  const user = useContext(AuthContext);

  const ref = doc(
    collection(getFirestore(), Config.collections.hoca),
    params.slug
  );
  const mutation = useFirestoreDocumentMutation(ref);
  const queryData = useFirestoreDocument([`/hoca/${params.slug}`], ref, {});

  const hocaUid = params.slug;
  const router = useRouter();

  const showNotification = useNotification();
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState('');
  const [again, setAgain] = useState('');
  const [attandance, setAttandance] = useState('');
  const [online, setOnline] = useState('');
  const [grade, setGrade] = useState('');
  const [course, setCourse] = useState('');

  if (queryData.isLoading) {
    return (
      <Container py={20} maw={1000}>
        <Group justify="center">
          <Loader />
        </Group>
      </Container>
    );
  }

  const docSnap = queryData.data;

  if (!docSnap?.exists()) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Text c="red">Hoca Bulunamadı.</Text>
        </Group>
      </Container>
    );
  }

  const hocaData: HocaType = {
    id: docSnap.id,
    ...docSnap.data(),
  } as HocaType;

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

    mutation.mutate({
      ...hocaData,
      comments: [...hocaData.comments, newComment],
    });

    if (mutation.isSuccess) {
      showNotification('success', 'Yorumunuz başarıyla eklendi.');
      client.resetQueries(`/hoca/${params.slug}`);
      router.push(`/hoca/${hocaUid}/`);
    }

    if (mutation.isError) {
      showNotification('error', 'Bir hata oluştu.');
    }
  };

  return (
    <>
      <Container py={20} maw={1000}>
        <form onSubmit={handleSubmit}>
          <Stack maw={900}>
            <Group>
              <Link href={`/hoca/${hocaUid}/`}>
                <Button variant="light" color="gray" radius="sm">
                  <IconArrowLeft />
                </Button>
              </Link>
            </Group>
            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Verdiğin Not <span style={{ color: 'red' }}>*</span>
              </Text>
              <Group>
                <Rating
                  defaultValue={0}
                  onChange={setRate}
                  emptySymbol={
                    <IconStar color="#cbcbcb" size={40} fill="#cbcbcb" />
                  }
                  fullSymbol={
                    <IconStarFilled size={40} style={{ color: '#f5b237' }} />
                  }
                />
                <Text c="gray">{rate}</Text>
              </Group>
            </Stack>

            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Aldığın Dersin Kodu <span style={{ color: 'red' }}>*</span>
              </Text>
              <TextInput
                radius="sm"
                size="md"
                maxLength={1000}
                label=""
                placeholder="Örn: MATH101"
                onChange={(e) => setCourse(e.currentTarget.value)}
                withAsterisk
                styles={{ input: { border: '1px solid gray' } }}
              />
            </Stack>

            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Bu Hoca'dan Tekrar Ders alır mıydın ?
              </Text>
              <Radio.Group name="again" withAsterisk onChange={setAgain}>
                <Group mt="xs">
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    value="yes"
                    size="md"
                    label="Evet"
                  />
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    size="md"
                    value="no"
                    label="Hayır"
                  />
                </Group>
              </Radio.Group>
            </Stack>

            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Yoklama Zorunlu mu ?
              </Text>
              <Radio.Group
                name="attandance"
                withAsterisk
                onChange={setAttandance}
              >
                <Group mt="xs">
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    value="yes"
                    size="md"
                    label="Zorunlu"
                  />
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    size="md"
                    value="no"
                    label="Değil"
                  />
                </Group>
              </Radio.Group>
            </Stack>

            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Eğitim Şekli ?
              </Text>
              <Radio.Group name="online" withAsterisk onChange={setOnline}>
                <Group mt="xs">
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    size="md"
                    value="onsite"
                    label="Yüz yüze"
                  />
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    size="md"
                    value="hybrid"
                    label="Hibrid"
                  />
                  <Radio
                    styles={{ radio: { borderColor: 'black' } }}
                    color="black"
                    size="md"
                    value="online"
                    label="Online"
                  />
                </Group>
              </Radio.Group>
            </Stack>

            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Aldığın Harf Notu
              </Text>
              <TextInput
                radius="sm"
                size="md"
                maxLength={1000}
                label=""
                placeholder="Örn: AA, BA, CB, CC, DC, DD, FD, FF"
                onChange={(e) => setGrade(e.currentTarget.value)}
                withAsterisk
                styles={{ input: { border: '1px solid gray' } }}
              />
            </Stack>

            <Stack
              gap={5}
              px={20}
              py={30}
              style={{
                border: '1px solid #e4e4e4',
                boxShadow: '#7e7e7e40 0px 2px 2px',
              }}
            >
              <Text size="md" fw="bold">
                Hocan Hakkında Yorumun
              </Text>
              <Textarea
                radius="sm"
                size="md"
                label=""
                placeholder="Bir şeyler yaz..."
                withAsterisk
                onChange={(e) => setComment(e.currentTarget.value)}
                maxLength={1000}
                styles={{ input: { border: '1px solid gray', height: 200 } }}
              />
            </Stack>

            <Stack mt={10} gap={20} justify="center" align="center">
              <Button
                type="submit"
                variant="filled"
                color="teal"
                size="md"
                radius="sm"
                h={60}
                w={180}
              >
                Kaydet
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default Page;
