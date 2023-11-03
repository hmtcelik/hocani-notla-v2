import { Center, Container, Loader, Skeleton, Stack } from '@mantine/core';
import React from 'react';

const loading = () => {
  return (
    <Container py={30} maw={1000}>
      <Center>
        <Skeleton width={300} h={50} />
      </Center>
    </Container>
  );
};

export default loading;
