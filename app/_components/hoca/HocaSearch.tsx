'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CloseButton, TextInput } from '@mantine/core';
import { IconSchool } from '@tabler/icons-react';

interface HocaSearchProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  inputHeight?: number;
  maxW?: number;
}

const HocaSearch = ({ size, inputHeight, maxW }: HocaSearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (search.trim() === '') return;
    router.push(`/search?value=${search}`);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      style={{
        width: '100%',
        maxWidth: maxW || 650,
      }}
    >
      <TextInput
        size={size || 'lg'}
        radius="xl"
        value={search}
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
            border: 'solid 2px',
          },
        }}
      />
    </form>
  );
};

export default HocaSearch;