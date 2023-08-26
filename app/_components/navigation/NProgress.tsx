'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgress = () => {
  return (
    <ProgressBar
      height="4px"
      color="#228be6"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default NProgress;
