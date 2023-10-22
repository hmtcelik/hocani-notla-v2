import { Stack, Group, Container, Center } from '@mantine/core';
import { Skeleton } from '@mantine/core';

const Loading = () => {
  return (
    <>
      <Container py={20} maw={1000}>
        <Stack maw={900}>
          <Group>
            <Skeleton width={80} height={35} />
          </Group>
          <Skeleton width={'100%'} height={150} px={20} py={30} />
          <Skeleton width={'100%'} height={150} px={20} py={30} />
          <Skeleton width={'100%'} height={150} px={20} py={30} />
          <Skeleton width={'100%'} height={150} px={20} py={30} />
          <Skeleton width={'100%'} height={150} px={20} py={30} />
          <Skeleton width={'100%'} height={150} px={20} py={30} />
          <Skeleton width={'100%'} height={250} px={20} py={30} />
          <Center>
            <Skeleton width={200} height={50} px={20} py={30} />
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default Loading;
