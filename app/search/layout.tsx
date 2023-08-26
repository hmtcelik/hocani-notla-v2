import React from 'react';
import BaseLayout from '../_layouts/BaseLayout';

const SearchPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <BaseLayout>{children}</BaseLayout>;
};

export default SearchPageLayout;
