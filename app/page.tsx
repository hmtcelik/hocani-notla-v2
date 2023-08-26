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
import IndexHeaderBar from './_components/navigation/IndexHeaderBar';
import { IconSchool } from '@tabler/icons-react';
import Link from 'next/link';
import HocaSearch from './_components/hoca/HocaSearch';
import Footer from './_components/navigation/Footer';

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
      <IndexHeaderBar />
      <div>
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
            <HocaSearch />
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
      <Footer />
    </>
  );
}
