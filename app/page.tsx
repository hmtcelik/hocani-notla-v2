import {
  BackgroundImage,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';

import initFirebase from './_services/InitService';
import IndexHeaderBar from './_components/navigation/IndexHeaderBar';
import HocaSearch from './_components/hoca/HocaSearch';
import { IconSearch } from '@tabler/icons-react';

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
  initFirebase();

  return (
    <>
      <IndexHeaderBar />
      <div>
        <Container size="xl">
          <Stack align="center" gap={5} pt={20}>
            <Image maw={400} src="hocaninotlalogo.jpeg" mb={20} />
            <Text fz={28}>
              <b>Arama</b> Yap
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
                  <SimpleGrid cols={{ base: 1, sm: 2 }} key={index}>
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
                  <div key={index}>
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
                  </div>
                );
            })}
          </Stack>
        </Container>
      </BackgroundImage>
    </>
  );
}
