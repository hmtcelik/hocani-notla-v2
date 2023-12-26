'use client';

import MyNots from '@/app/_layouts/MyNots';
import Config from '@/app/_services/Config';
import Loading from './loading';
import { Center, Container } from '@mantine/core';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { useSession } from 'next-auth/react';

type UserAttrsType = {
  id: string;
  rates: string[];
};

const ProfilePage = () => {
  const user = useSession();

  const ref = doc(
    collection(getFirestore(), Config.collections.userAttrs),
    user?.data?.user?.id
  );

  const queryData = useFirestoreDocument(
    ['userAttrs', user?.data?.user?.id],
    ref,
    { subscribe: false },
    {}
  );

  if (queryData.isLoading) {
    return (
      <Container py={30} maw={1000}>
        <Loading />
      </Container>
    );
  }

  const docSnap = queryData.data;
  if (!docSnap?.exists()) {
    return (
      <Container py={30} maw={1000}>
        <p>Hata olustu</p>
      </Container>
    );
  }

  const data: string[] = docSnap.data()?.rates || [];

  return (
    <Container py={30} maw={1000}>
      <Center>
        <h1>Verdiğim Notlar</h1>
      </Center>
      <Container py={30} maw={800}>
        <MyNots hocaIds={data} />
      </Container>
    </Container>
  );
};

export default ProfilePage;
