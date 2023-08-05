'use client';

import { AppShell, Center, Group } from '@mantine/core';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import SideNavbar from '../_components/SideNavbar';
import HeaderBar from '../_components/HeaderBar';
import AppFooter from '../_components/AppFooter';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#228be6"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: '21%', breakpoint: 'md', collapsed: { mobile: true } }}
        footer={{ height: 58 }}
        padding="md"
      >
        <AppShell.Header p={8}>
          <HeaderBar />
        </AppShell.Header>

        <AppShell.Navbar pr={5} pb={5} pt={5}>
          <SideNavbar />
        </AppShell.Navbar>

        <AppShell.Main pr={{ base: 10, md: 10, lg: 200 }}>
          {children}
        </AppShell.Main>

        <AppShell.Footer display={{ base: 'block', md: 'none' }}>
          <AppFooter />
        </AppShell.Footer>
      </AppShell>
    </>
  );
}
