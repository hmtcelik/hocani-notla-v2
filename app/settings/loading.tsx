import React from 'react';
import { Skeleton, Stack } from '@mantine/core';

const SettingsLoading = () => {
  return (
    <Stack gap="xs" className="settings">
      <Skeleton className="skeleton" height={60} radius="xl" />
      <Skeleton className="skeleton" height={60} radius="xl" />
      <Skeleton className="skeleton" height={60} radius="xl" />
    </Stack>
  );
};

export default SettingsLoading;