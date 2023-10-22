import { Container, Skeleton, Stack } from '@mantine/core';

const Loading = () => {
  return (
    <>
      <Container py={60} maw={1000} mt={10}>
        <Stack>
          <Skeleton width={300} height={20} mb={30} />
          <Skeleton width={'100%'} height={120} />
          <Skeleton width={'100%'} height={120} />
          <Skeleton width={'100%'} height={120} />
          <Skeleton width={'100%'} height={120} />
          <Skeleton width={'100%'} height={120} />
        </Stack>
      </Container>
    </>
  );
};

export default Loading;
