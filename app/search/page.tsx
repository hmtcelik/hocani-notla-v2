'use client';

import { Container, Group, Loader, Stack, Text } from '@mantine/core';
import HocaResultCard from '../_components/hoca/HocaResultCard';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import {
  collection,
  doc,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';

import Config from '../_services/Config';
import { HocaType } from '@/app/_models/Hoca';
import { useSearchParams } from 'next/navigation';
import initFirebase from '../_services/InitService';
import { useEffect, useState } from 'react';
import useHocaSearch from '../_hooks/useHocaSearch';
import HocaService from '../_services/HocaService';

const SearchPage = () => {
  initFirebase();

  const searchHoca = useHocaSearch();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('value');

  const [searchData, setSearchData] = useState<HocaType[]>([]);
  const [searchResultLen, setSearchResultLen] = useState<number>(0);

  useEffect(() => {
    const findHoca = async () => {
      setSearchData([]);

      if (searchValue) {
        const data = await searchHoca(searchValue);
        setSearchResultLen(data?.length || 0);
        data?.slice(0, 10)?.forEach(async (item: String) => {
          const ref = doc(
            collection(getFirestore(), Config.collections.hoca),
            item.toString()
          );

          const hocaData = await HocaService.getHoca(item.toString());

          if (hocaData) {
            setSearchData((prev) => [...prev, hocaData]);
          }
        });
      }
    };

    findHoca();
  }, [searchValue]);

  return (
    <>
      <Container py={60} maw={1000}>
        <Text fz={18}>
          <b>&quot;{searchValue}&quot;</b> ile ilgili <b>{searchResultLen}</b>{' '}
          sonuç bulundu.
        </Text>
        <Stack py={30}>
          {searchData.map((item: HocaType, index: number) => {
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
