import { Button, Container, Group, Image } from '@mantine/core';
import HocaSearch from '../hoca/HocaSearch';
import Link from 'next/link';
// import HocaSearch from '../hoca/HocaSearch';

const HeaderBar = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'black',
        }}
      >
        <Container size="xl" py={15}>
          <Group justify="space-between" align="center">
            <Link href="/">
              <Image
                maw={200}
                src="https://www.ratemyprofessors.com/static/media/big_rmp_logo_black.41f961d6.svg"
              />
            </Link>
            <HocaSearch size="md" inputHeight={30} maxW={500} />
            <Group>
              <Button px={20} radius="xl" color="white" variant="outline">
                Giriş Yap
              </Button>
            </Group>
          </Group>
        </Container>
      </div>
    </>
  );
};

export default HeaderBar;
