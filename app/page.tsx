'use client';

import { useDisclosure } from '@mantine/hooks';
import { AppShell, Grid } from '@mantine/core';

import SideNavbar from './_components/SideNavbar';
import HeaderBar from './_components/HeaderBar';
import PopularDoctors from './_components/PopularDoctors';
import Post from './_components/Post';

const POSTS = [
  {
    id: 1,
    author: 'Abdulhamit Çelik',
    username: 'abdulhamitcelik',
    text: 'Paras is an orange, insectoid Pokémon that resembles the nymph stage of a cicada. Its ovoid body is segmented, and it has three pairs of legs. The foremost pair of legs is the largest and has sharp claws at the tips. There are five specks on its forehead and three teeth on either side of its mouth. It has circular eyes with large pseudopupils.',
    date: '21-06-2021',
    likes: 10,
    comments: 5,
    shares: 2,
  },
  {
    id: 2,
    author: 'John Doe',
    username: 'johndoe123',
    text: 'Just had an amazing day at the beach! 🏖️ #summerfun #beachvibes',
    date: '29-07-2023',
    likes: 25,
    comments: 8,
    shares: 3,
  },
  {
    id: 5,
    author: 'Jessica Parker',
    username: 'jess_p',
    text: "As an art lover, I spent the entire day wandering through museums and galleries. The beauty and creativity of each piece left me in awe. Art has this incredible power to evoke emotions and connect people from different backgrounds. It's a universal language that speaks to our souls. If you haven't explored the world of art, I highly recommend it. You might just discover a whole new realm of inspiration and wonder! 🎨✨ #artlover #museumday #creativity",
    date: '25-07-2023',
    likes: 512,
    comments: 93,
    shares: 50,  
  },
  {
    id: 2,
    author: 'Jane Smith',
    username: 'janesmith456',
    text: 'Excited to announce that my first book is now available for pre-order! 📚🎉 #author #newbook',
    date: '28-07-2023',
    likes: 50,
    comments: 15,
    shares: 5,  
  },
  {
    id: 3,
    author: 'Alex Johnson',
    username: 'alexj91',
    text: 'Spent the weekend hiking in the mountains. The views were breathtaking! ⛰️ #naturelovers #hikingadventures',
    date: '27-07-2023',
    likes: 35,
    comments: 6,
    shares: 2,  
  },
  {
    id: 4,
    author: 'Sarah Miller',
    username: 'sarahm1987',
    text: 'Just got back from a trip to Japan! 🇯🇵 #travel #jetsetter',
    date: '26-07-2023',
    likes: 20,
    comments: 3,
    shares: 1,
  },
]

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 400, breakpoint: 'lg', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header p={8}>
        <HeaderBar opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar pl={{ base: 5, lg: 200 }} pr={5} pb={5} pt={5}>
        <SideNavbar />
      </AppShell.Navbar>

      <AppShell.Main pr={{ base: 5, lg: 200 }} >
        <Grid>
          <Grid.Col span={{ base: 12, md: 8, lg:8.8 }}>
            {POSTS.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </Grid.Col>
          <Grid.Col
            display={{ base: 'none', md: 'block' }}
            span={{ base: 12, md: 4, lg:3.2 }}
          >
            <PopularDoctors />
          </Grid.Col>
        </Grid>
      </AppShell.Main>
    </AppShell>
  );
}
