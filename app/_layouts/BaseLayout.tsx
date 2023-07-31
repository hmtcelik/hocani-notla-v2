'use client'

import { useDisclosure } from '@mantine/hooks';
import { AppShell } from '@mantine/core';

import SideNavbar from '../_components/SideNavbar';
import HeaderBar from '../_components/HeaderBar';

interface BaseLayoutProps {
    children: React.ReactNode
}

export default function BaseLayout({children}: BaseLayoutProps) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
        header={{ height: 60 }}
        navbar={{ width: '20%', breakpoint: 'lg', collapsed: { mobile: !opened } }}
        padding="md"
      >

        <AppShell.Header p={8}>
          <HeaderBar opened={opened} toggle={toggle} />
        </AppShell.Header>
  
        <AppShell.Navbar  pr={5} pb={5} pt={5}>
          <SideNavbar />
        </AppShell.Navbar>
  
        <AppShell.Main pr={{ base: 10, md:10, lg: 160 }} >
            {children}
        </AppShell.Main>

      </AppShell>
  
    )
}