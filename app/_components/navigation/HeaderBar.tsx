'use client';

import {
  ActionIcon,
  Collapse,
  Container,
  Flex,
  Group,
  Image,
  Stack,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMenu2, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import AuthModal from '../auth/AuthModal';
import HocaSearch from '../hoca/HocaSearch';

const HeaderBar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const smallerSm = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <div
        style={{
          backgroundColor: '#303841',
        }}
      >
        <Container size="xl" py={15}>
          <Stack>
            <Group justify="space-between" align="center">
              <Link href="/">
                <Image
                  maw={175}
                  src="https://www.ratemyprofessors.com/static/media/big_rmp_logo_black.41f961d6.svg"
                />
              </Link>
              <ActionIcon
                display={{ base: 'block', sm: 'none' }}
                variant="transparent"
                color="white"
                size="md"
                onClick={() => {
                  toggle();
                }}
              >
                {opened ? <IconX /> : <IconMenu2 />}
              </ActionIcon>
              <HocaSearch
                size="md"
                inputHeight={30}
                maxW={500}
                display={{ base: 'none', sm: 'block' }}
              />
              <Group display={{ base: 'none', sm: 'block' }}>
                <AuthModal
                  button={{
                    color: 'white',
                    label: 'Giriş Yap',
                    variant: 'outline',
                  }}
                />
              </Group>
            </Group>
            {smallerSm && (
              <Collapse
                in={opened}
                transitionDuration={100}
                transitionTimingFunction="linear"
              >
                <Flex
                  direction={{ base: 'column', xs: 'row' }}
                  gap={10}
                  justify="space-between"
                >
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
                </Flex>
              </Collapse>
            )}
          </Stack>
        </Container>
      </div>
    </>
  );
};

export default HeaderBar;
