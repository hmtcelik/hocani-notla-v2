'use client';

import React from 'react';
import BaseLayout from '../../_layouts/BaseLayout';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const HocaPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BaseLayout>
  );
};
export default HocaPageLayout;
