'use client';

import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DoctorSearch() {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  return (
    <Autocomplete
      variant="filled"
      size="md"
      radius="xl"
      placeholder="Hocanı Ara"
      className="navbar-search"
      data={data}
      value={search}
      onChange={() => {}}
      onOptionSubmit={(newVal) => {
        setSearch('');
        router.push('/doctor/' + newVal + '/');
      }}
      leftSection={<IconSearch size={20} color="#666666" />}
    />
  );
}

const data = [
  {
    value: '123456',
    label: 'İlker Türker',
  },
  {
    value: '789012',
    label: 'Fehmi Akyol',
  },
  {
    value: '345678',
    label: 'Ali Vural',
  },
  {
    value: '901234',
    label: 'Rahmiye Uslu',
  },
  {
    value: '567890',
    label: 'Tekin Özdemir',
  },
];
