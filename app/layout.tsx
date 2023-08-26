import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import './style.scss';
import '@mantine/notifications/styles.css';

import BaseLayout from './_layouts/BaseLayout';
import Footer from './_components/navigation/Footer';
import NProgress from './_components/navigation/NProgress';

export const metadata: Metadata = {
  title: 'Hocani Notla v2',
  description: 'A new version of Hocani Notla',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
