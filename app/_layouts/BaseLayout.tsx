'use client';

import React, { useEffect } from 'react';
import { AppShell } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import SideNavbar from '../_components/navigation/SideNavbar';
import HeaderBar from '../_components/navigation/HeaderBar';
import AppFooter from '../_components/navigation/AppFooter';
import AuthProvider from '../_providers/AuthProvider';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  const pathname: string = usePathname();
  const [_, scrollTo] = useWindowScroll();

  useEffect(() => {
    scrollTo({ x: 0, y: 0 });
  }, [pathname]);

  return (
    <>
      <AuthProvider>
        <ProgressBar
          height="4px"
          color="#228be6"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: '21%',
            breakpoint: 'md',
            collapsed: { mobile: true },
          }}
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
      </AuthProvider>
    </>
  );
}
