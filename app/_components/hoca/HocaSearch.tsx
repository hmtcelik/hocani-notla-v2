'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CloseButton, TextInput } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';

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

const HocaSearch = ({
  size,
  inputHeight,
  maxW,
  borderColor,
  display,
}: HocaSearchProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const searchValue = searchParams.get('value');

  const [search, setSearch] = useState<string>(searchValue || '');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/search?value=${search}`);
  };

  return (
    <Box w="100%" maw={maxW || 650} display={display}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          size={size || 'lg'}
          radius="xl"
          value={search}
          w="100%"
          placeholder="Örn: Can Alkan"
          onChange={(e) => setSearch(e.currentTarget.value)}
          leftSection={<IconSchool color="black" />}
          rightSection={
            <CloseButton
              color="black"
              aria-label="Clear input"
              onClick={() => setSearch('')}
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
