'use client';

import {
  Button,
  Container,
  Group,
  Loader,
  Radio,
  Rating,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { IconArrowLeft, IconStar, IconStarFilled } from '@tabler/icons-react';
import { arrayUnion, collection, doc, getFirestore } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';

import useNotification from '@/app/_hooks/useNotification';
import { CommentType } from '@/app/_models/Comment';
import Config from '@/app/_services/Config';
import initFirebase from '@/app/_services/InitService';
import { useForm } from '@mantine/form';
import { useSession } from 'next-auth/react';
import { getAuth } from 'firebase/auth';

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
  const router = useRouter();
  const showNotification = useNotification();

  const user = session?.data?.user || null;
  const hocaUid = params.slug;

  const form = useForm({
    initialValues: initialValues,
    validate: {
      rate: (value) => (value == 0 ? 'Lütfen bir not veriniz.' : null),
      course: (value) => (value == '' ? 'Lütfen dersin adını giriniz.' : null),
    },
  });

  const ref = doc(collection(getFirestore(), Config.collections.hoca), hocaUid);
  const mutation = useFirestoreDocumentMutation(ref, { merge: true });

  const handleSubmit = (values: formValuesType) => {
    if (mutation.isLoading) return;

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

    mutation.mutate({
      comments: arrayUnion(newComment),
    });

    // showNotification(
    //   'success',
    //   'Yorumunuz başarıyla eklendi.'
    // );

    router.push(`/hoca/${hocaUid}`);
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
                Aldığın Ders <span style={{ color: 'red' }}>*</span>
              </Text>
              <TextInput
                radius="sm"
                size="md"
                maxLength={1000}
                placeholder="Örn: Fizik 1"
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
                {mutation.isLoading ? <Loader c="white" /> : 'Kaydet'}
              </Button>
            </Stack>

            {mutation.error && (
              <Text mt={10} c="red">
                {mutation.error.message}
              </Text>
            )}
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default Page;
