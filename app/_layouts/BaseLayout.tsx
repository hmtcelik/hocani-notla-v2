import { Container } from '@mantine/core';

import HeaderBar from '../_components/navigation/HeaderBar';
import NProgress from '../_components/navigation/NProgress';
import AuthProvider from '../_providers/AuthProvider';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      <AuthProvider>
        <HeaderBar />
        <Container size="xl">{children}</Container>
      </AuthProvider>
    </>
  );
}
