import { Container } from '@mantine/core';

import HeaderBar from '../_components/navigation/HeaderBar';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <HeaderBar />
      <Container size="xl">{children}</Container>
    </>
  );
}
