import { Center, Container, Stack, Text } from '@mantine/core';
import React from 'react';
import HocaResultCard from '../_components/hoca/HocaResultCard';
import Link from 'next/link';

const SearchPage = () => {
  return (
    <>
      <Container py={60} maw={1000}>
        <Text fz={18}>
          <b>&quot;Can Alkan&quot;</b> ile ilgili <b>3</b> sonuç bulundu.
        </Text>
        <Stack py={30}>
          <HocaResultCard
            hocaUid="iqjuewf92"
            score={5}
            name="Can Alkan"
            rateCount={20}
            university="Boğaziçi Üniversitesi"
          />
          <HocaResultCard
            hocaUid="iqjuewf92"
            score={2}
            name="Abdulhamit Çelik"
            rateCount={3}
            university="Ortadoğu Teknik Üniversitesi"
          />
          <HocaResultCard
            hocaUid="iqjuewf92"
            score={3}
            name="Caner Özcan"
            rateCount={79}
            university="Karabük Üniversitesi"
          />
        </Stack>
        <Stack ta="center" gap={3}>
          <Text>Aradığını bulamadın mı?</Text>
          <Link href="#">
            <Text td={'underline'}>Kendin ekle</Text>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default SearchPage;
