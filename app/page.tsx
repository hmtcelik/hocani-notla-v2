import {
  BackgroundImage,
  Center,
  Container,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import initFirebase from './_services/InitService';
import HeaderBar from './_components/navigation/HeaderBar';
import { IconSchool } from '@tabler/icons-react';

initFirebase();

export default function Home() {
  return (
    <>
      <HeaderBar />
      <div
        style={{
          backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), 
            url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container size="xl" mt={50}>
          <Stack align="center" gap={40} py={100}>
            <Image
              maw={400}
              src="https://www.ratemyprofessors.com/static/media/big_rmp_logo_black.41f961d6.svg"
            />
            <Text fz={36} c="white">
              <b>Hocanı</b> Ara
            </Text>
            <TextInput
              size="lg"
              radius="xl"
              w="100%"
              maw={550}
              placeholder="Örn: Can Alkan"
              leftSection={<IconSchool color="black" />}
              styles={{
                section: {
                  marginLeft: 7,
                },
                input: {
                  paddingLeft: 55,
                  height: 55,
                },
              }}
            />
          </Stack>
        </Container>
      </div>
    </>
  );
}
