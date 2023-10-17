'use client';

import { Center, Container, Loader, Stack, Text } from '@mantine/core';
import HocaResultCard from '../_components/hoca/HocaResultCard';

import { HocaType } from '@/app/_models/Hoca';
import { useSearchParams } from 'next/navigation';
import initFirebase from '../_services/InitService';
import { useEffect, useRef, useState } from 'react';
import useHocaSearch from '../_hooks/useHocaSearch';
import HocaService from '../_services/HocaService';

const SearchPage = () => {
  initFirebase();

  const searchHoca = useHocaSearch();
  const viewport = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('value');

  const [searchData, setSearchData] = useState<HocaType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchResultLen, setSearchResultLen] = useState<number>(0);

  const findHoca = async () => {
    if (searchValue && hasMore && !loading) {
      setLoading(true);
      try {
        const data = await searchHoca(searchValue);
        let dataLength = data?.length || 0;
        setSearchResultLen(dataLength);
        const slicedData = data?.slice((page - 1) * 10, page * 10) || [];

        const hocaData = await Promise.all(
          slicedData.map(async (item) => {
            const hocaData = await HocaService.getHoca(item.toString());
            return hocaData;
          })
        );

        setSearchData((prev) => [...prev, ...(hocaData as HocaType[])]);
        dataLength = data?.length || 0;

        setHasMore(dataLength > page * 10);
        setPage((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleScroll = () => {
    const container = viewport.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (containerRect.bottom < windowHeight && hasMore && !loading) {
        findHoca();
      }
    }
  };

  const resetSearchStates = () => {
    setSearchData([]);
    setPage(1);
    setHasMore(true);
    setSearchResultLen(0);
  };

  useEffect(() => {
    resetSearchStates();
    findHoca();
  }, [searchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <>
      <Container py={60} maw={1000} ref={viewport}>
        <Text fz={18}>
          <b>&quot;{searchValue}&quot;</b> ile ilgili <b>{searchResultLen}</b>{' '}
          sonuç bulundu.
        </Text>
        <div>
          <Stack
            py={30}
            style={{
              overflow: 'auto',
              display: 'flex',
              border: '1px solid red',
            }}
          >
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
            {loading && (
              <Center>
                <Loader />
              </Center>
            )}
          </Stack>
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
