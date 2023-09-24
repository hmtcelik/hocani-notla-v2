import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import './style.scss';
import '@mantine/notifications/styles.css';

import Footer from './_components/navigation/Footer';
import NProgress from './_components/navigation/NProgress';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionProvider from './_providers/SessionProvider';

export const metadata: Metadata = {
  title: 'Hocani Notla v2',
  description: 'A new version of Hocani Notla',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript color="light" />
      </head>
      <body>
        <MantineProvider
          defaultColorScheme="light"
          theme={{
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          <NProgress />
          <Notifications position="top-right" />
          <SessionProvider session={session}>{children}</SessionProvider>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
