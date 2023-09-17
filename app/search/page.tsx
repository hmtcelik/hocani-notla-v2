'use client';

import { Container, Group, Loader, Stack, Text } from '@mantine/core';
import HocaResultCard from '../_components/hoca/HocaResultCard';
import Link from 'next/link';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import {
  collection,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';

import Config from '../_services/Config';
import { HocaType } from '@/app/_models/Hoca';

interface SearchPageProps {
  searchParams: {
    value: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const ref = query(
    collection(getFirestore(), Config.collections.hoca),
    where('searchIdx', '==', searchParams.value.slice(0, 3).toLowerCase()),
    limit(5)
  );

  const queryData = useFirestoreQuery([Config.collections.hoca], ref);
  if (queryData.isLoading) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Loader />
        </Group>
      </Container>
    );
  }

  if (queryData.isError) {
    return (
      <Container py={60} maw={1000}>
        <Group justify="center">
          <Text c="red">Bir hata oluştu.</Text>
        </Group>
      </Container>
    );
  }

  const data = Array();
  queryData.data?.forEach((d) => {
    data.push({
      id: d.id,
      ...d.data(),
    });
  });

  console.log(data);

  return (
    <>
      <Container py={60} maw={1000}>
        <Text fz={18}>
          <b>&quot;{searchParams.value}&quot;</b> ile ilgili{' '}
          <b>{data.length}</b> sonuç bulundu.
        </Text>
        <Stack py={30}>
          {data.map((item: HocaType, index: number) => {
            const comments = item.comments;
            const averageRate =
              comments.length > 0
                ? comments.reduce((acc, comment) => acc + comment.rate, 0) /
                  comments.length
                : 0;

            return (
              <div key={index}>
                <HocaResultCard
                  hocaUid={item.id}
                  score={averageRate}
                  depart={item.department}
                  name={item.name}
                  rateCount={comments.length}
                  university={item.university}
                />
              </div>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default SearchPage;
