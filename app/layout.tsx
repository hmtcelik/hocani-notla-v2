import "@mantine/core/styles.css";
import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

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
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
