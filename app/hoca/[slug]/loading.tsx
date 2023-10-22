import { Container, SimpleGrid, Stack, Skeleton } from '@mantine/core';

export default function Loading() {
  return (
    <>
      <Container py={80} maw={1000}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={20}>
          <Stack gap={20} justify="flex-start">
            <Stack gap={10}>
              <Skeleton width={220} height={30} />
              <Skeleton width={350} height={45} />
            </Stack>
            <Skeleton width={200} height={50} radius="xl" />
          </Stack>
          <Skeleton width={'100%'} height={170} />
        </SimpleGrid>
        <Skeleton width={'100%'} height={2} my={30} mt={50} />
        <Stack gap={30}>
          <Skeleton width={'100%'} height={200} />
          <Skeleton width={'100%'} height={200} />
        </Stack>
      </Container>
    </>
  );
}
