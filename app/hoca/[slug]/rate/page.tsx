'use client';

import {
  Button,
  Container,
  Group,
  Radio,
  Rating,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { IconArrowLeft, IconStar, IconStarFilled } from '@tabler/icons-react';
import { collection, doc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';

import useNotification from '@/app/_hooks/useNotification';
import { CommentType } from '@/app/_models/Comment';
import { HocaType } from '@/app/_models/Hoca';
import Config from '@/app/_services/Config';
import HocaService from '@/app/_services/HocaService';
import initFirebase from '@/app/_services/InitService';
import { useForm } from '@mantine/form';
import { useSession } from 'next-auth/react';
import Loading from './loading';

interface formValuesType {
  rate: number;
  comment: string;
  again: string;
  attandance: string;
  online: string;
  grade: string;
  course: string;
}

const initialValues = {
  rate: 0,
  comment: '',
  again: '',
  attandance: '',
  online: '',
  grade: '',
  course: '',
};

const Page = ({ params }: { params: { slug: string } }) => {
  initFirebase();

  const client = useQueryClient();

  const session = useSession();
  const user = session?.data?.user || null;

  const form = useForm({
    initialValues: initialValues,
    validate: {
      rate: (value) => (value == 0 ? 'Lütfen bir not veriniz.' : null),
      course: (value) => (value == '' ? 'Lütfen bir ders kodu giriniz.' : null),
    },
  });

  const ref = doc(
    collection(getFirestore(), Config.collections.hoca),
    params.slug
  );

  const queryData = useFirestoreDocument(
    [`/hoca/${params.slug}`],
    ref,
    {
      subscribe: false,
    },
    {
      onSuccess: (data) => {
        if (data?.exists()) {
          const docSnap = data;
          const hocaData: HocaType = {
            id: docSnap.id,
            ...docSnap.data(),
          } as HocaType;

          const not = hocaData.comments.find(
            (item) => item.commenter === user?.id
          );
          if (not) {
            form.values.again = not?.again
              ? 'yes'
              : not?.again === false
              ? 'no'
              : initialValues.again;
            form.values.attandance = not?.attandance
              ? 'yes'
              : not?.attandance === false
              ? 'no'
              : initialValues.attandance;
            form.values.online = not?.online || initialValues.online;
            form.values.grade = not?.grade || initialValues.grade;
            form.values.comment = not?.comment || initialValues.comment;
            form.values.rate = not?.rate || initialValues.rate;
            form.values.course = not?.course || initialValues.course;
          }
        }
      },
    }
  );

  const hocaUid = params.slug;
  const router = useRouter();

  const showNotification = useNotification();

  if (queryData.isLoading) {
    return <Loading />;
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

  const handleSubmit = (values: formValuesType) => {
    const newComment: CommentType = {
      ...values,
      again:
        values.again === 'yes' ? true : values.again === 'no' ? false : null,
      attandance:
        values.attandance === 'yes'
          ? true
          : values.attandance === 'no'
          ? false
          : null,
      date: new Date().toISOString(),
      commenter: user?.id || '',
      likes: [],
      dislikes: [],
      flag: false,
      visible: true,
      survey_id: '',
    };

    HocaService.updateHocaComments(hocaUid, [...hocaData.comments, newComment])
      .then(() => {
        client.removeQueries(`/hoca/${params.slug}`);
        router.push(`/hoca/${hocaUid}/`);
      })
      .catch((error) => {
        console.log(error);
        showNotification('error', 'Bir hata oluştu.');
      });
  };

  return (
    <>
      <Container py={20} maw={1000}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
                  inputMode="numeric"
                  emptySymbol={
                    <IconStar color="#cbcbcb" size={40} fill="#cbcbcb" />
                  }
                  fullSymbol={
                    <IconStarFilled size={40} style={{ color: '#f5b237' }} />
                  }
                  {...form.getInputProps('rate')}
                />
                <Text c="gray">{form.values.rate}</Text>
              </Group>
              <Text c="red" fz={14}>
                {form.errors.rate}
              </Text>
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
                placeholder="Örn: MATH101"
                withAsterisk
                styles={{ input: { border: '1px solid gray' } }}
                {...form.getInputProps('course')}
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
                Bu Hoca&apos;dan Tekrar Ders alır mıydın ?
              </Text>
              <Radio.Group name="again" {...form.getInputProps('again')}>
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
                {...form.getInputProps('attandance')}
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
              <Radio.Group name="online" {...form.getInputProps('online')}>
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
                placeholder="Örn: AA, BA, CB, CC, DC, DD, FD, FF"
                styles={{ input: { border: '1px solid gray' } }}
                {...form.getInputProps('grade')}
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
                placeholder="Bir şeyler yaz..."
                maxLength={1000}
                styles={{ input: { border: '1px solid gray', height: 200 } }}
                {...form.getInputProps('comment')}
              />
            </Stack>

            <Stack mt={10} gap={20} justify="center" align="center">
              {(form.errors.rate || form.errors.course) && (
                <span style={{ color: 'red' }}>
                  {form.errors.rate || form.errors.course}
                </span>
              )}
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
