import React from 'react';
import BaseLayout from '../../_layouts/BaseLayout';

const HocaPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default HocaPageLayout;
