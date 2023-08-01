import "@mantine/core/styles.css";
import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "./style.scss";
import BaseLayout from "./_layouts/BaseLayout";

export const metadata: Metadata = {
  title: 'Hocani Notla v2',
  description: 'A new version of Hocani Notla',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript color="light" />
      </head>
      <body>
          <MantineProvider>
              <BaseLayout>
                  {children}
              </BaseLayout>
          </MantineProvider>
      </body>
    </html>
  )
}
