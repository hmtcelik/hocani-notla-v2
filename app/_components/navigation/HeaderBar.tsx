import { Button, Container, Group, Image } from '@mantine/core';
import HocaSearch from '../hoca/HocaSearch';
import Link from 'next/link';
import AuthModal from '../auth/AuthModal';
// import HocaSearch from '../hoca/HocaSearch';
const HeaderBar = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#303841',
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
              <AuthModal
                button={{
                  color: 'white',
                  label: 'Giriş Yap',
                  variant: 'outline',
                }}
              />
            </Group>
          </Group>
        </Container>
      </div>
    </>
  );
};

export default HeaderBar;
