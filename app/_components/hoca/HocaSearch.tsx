'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CloseButton, TextInput } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';
import useHocaSearch from '@/app/_hooks/useHocaSearch';
import HocaService from '@/app/_services/HocaService';
import { collection, doc, getFirestore } from 'firebase/firestore';
import Config from '@/app/_services/Config';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { useDebouncedState } from '@mantine/hooks';

type ResponsiveProps = {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  base?: string;
};

interface HocaSearchProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  inputHeight?: number;
  maxW?: number;
  borderColor?: string;
  display?: string | ResponsiveProps;
}

type SearchDataType = {
  id: string;
  name: string;
};

const HocaSearch = ({
  size,
  inputHeight,
  maxW,
  borderColor,
  display,
}: HocaSearchProps) => {
  const router = useRouter();
  const searchHoca = useHocaSearch();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('value');

  const [search, setSearch] = useDebouncedState(searchValue || '', 600);
  const [searchData, setSearchData] = useState<SearchDataType[]>([]);

  useEffect(() => {
    const findHoca = async () => {
      if (search) {
        const data = await searchHoca(search);
        data?.slice(0, 5)?.forEach(async (item: String) => {
          const ref = doc(
            collection(getFirestore(), Config.collections.hoca),
            item.toString()
          );

          const hocaData = await HocaService.getHoca(item.toString());

          setSearchData((prev) => [
            ...prev,
            {
              id: item.toString(),
              name: hocaData?.name || '',
            },
          ]);
        });
      }
    };

    findHoca();
  }, [search]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/search?value=${search}`);
  };

  return (
    <Box
      display={display}
      style={{
        width: '100%',
        maxWidth: maxW || 650,
      }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          size={size || 'lg'}
          radius="xl"
          defaultValue={search}
          placeholder="Örn: Can Alkan"
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setSearchData([]);
          }}
          leftSection={<IconSchool color="black" />}
          rightSection={
            <CloseButton
              color="black"
              aria-label="Clear input"
              onClick={() => {
                setSearch('');
                setSearchData([]);
              }}
              style={{ display: search ? undefined : 'none' }}
            />
          }
          styles={{
            section: {
              marginLeft: 7,
              marginRight: 7,
            },
            input: {
              paddingLeft: 60,
              height: `${inputHeight || '60'}`,
              border: `solid 2px ${borderColor || 'black'}`,
            },
          }}
        />
      </form>
    </Box>
  );
};

export default HocaSearch;
