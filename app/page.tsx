import {
  BackgroundImage,
  Center,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

import initFirebase from './_services/InitService';
import HeaderBar from './_components/navigation/HeaderBar';
import { IconSchool } from '@tabler/icons-react';
import Link from 'next/link';

initFirebase();

const illusts = [
  {
    title: 'Not Verip Değerlendirme Yap',
    desc: 'Hemen hocanı arayıp not ver. Hocanın yorumlarını okumayı unutma!',
    src: '/illust/keyboard.svg',
  },
  {
    title: 'Kim Olduğun Gizli Kalır',
    desc: 'Yaptığın yorumların her zaman gizli kalır. Özgürce yorum yapabilirsin!',
    src: '/illust/annon.svg',
  },
  {
    title: 'Yapılan Yorumları Gör',
    desc: 'Yapılmış yorumları inceleyebilirsin, faydalı olanları beğenmeyi unutma!',
    src: '/illust/like-dislike.svg',
  },
];

export default function Home() {
  return (
    <>
      <HeaderBar />
      <div
      // style={{
      //   backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%),
      //   url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80)`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
      >
        <Container size="xl">
          <Stack align="center" gap={20} py={80}>
            <Image
              maw={400}
              src="https://www.ratemyprofessors.com/static/media/big_rmp_logo_black.41f961d6.svg"
              mb={30}
            />
            <Text fz={36}>
              <b>Hocanı</b> Ara
            </Text>
            <TextInput
              size="lg"
              radius="xl"
              w="100%"
              maw={650}
              placeholder="Örn: Can Alkan"
              leftSection={<IconSchool color="black" />}
              styles={{
                section: {
                  marginLeft: 7,
                },
                input: {
                  paddingLeft: 60,
                  height: 60,
                  border: 'solid 2px',
                },
              }}
            />
          </Stack>
        </Container>
      </div>
      <BackgroundImage src="/bg/shape.svg" mt={20}>
        <Container size="xl">
          <Stack gap={30}>
            {illusts.map((item, index) => {
              if (index % 2 === 0)
                return (
                  <SimpleGrid cols={{ base: 1, sm: 2 }}>
                    <Stack ta="center" align="center" justify="center" gap={5}>
                      <Title order={2} fw={800}>
                        {item.title}
                      </Title>
                      <Text fz={20}>{item.desc}</Text>
                    </Stack>
                    <Image src={item.src} />
                  </SimpleGrid>
                );
              else
                return (
                  <>
                    <SimpleGrid
                      display={{ base: 'none', sm: 'grid' }}
                      cols={{ base: 1, sm: 2 }}
                    >
                      <Image src={item.src} />
                      <Stack
                        ta="center"
                        align="center"
                        justify="center"
                        gap={5}
                      >
                        <Title order={2} fw={800}>
                          {item.title}
                        </Title>
                        <Text fz={20}>{item.desc}</Text>
                      </Stack>
                    </SimpleGrid>
                    <SimpleGrid
                      display={{ base: 'grid', sm: 'none' }}
                      cols={{ base: 1, sm: 2 }}
                    >
                      <Stack
                        ta="center"
                        align="center"
                        justify="center"
                        gap={5}
                      >
                        <Title order={1} fw={800}>
                          {item.title}
                        </Title>
                        <Text fz={20}>{item.desc}</Text>
                      </Stack>
                      <Image src={item.src} />
                    </SimpleGrid>
                  </>
                );
            })}
          </Stack>
        </Container>
      </BackgroundImage>
      <Container py={30} size="xl">
        <Group justify="space-between">
          <Text>© Hocanı Notla</Text>
          <Group>
            {['Gizlilik', 'Şartlar', 'Yardım'].map((item) => (
              <Link href="#">
                <Text>{item}</Text>
              </Link>
            ))}
          </Group>
        </Group>
      </Container>
    </>
  );
}
