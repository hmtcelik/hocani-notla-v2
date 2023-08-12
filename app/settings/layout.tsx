import React from 'react';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div style={{ maxWidth: 900 }}>{children}</div>
    </>
  );
};

export default SettingsLayout;
