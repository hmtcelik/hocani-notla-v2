import React from 'react';
import Link from 'next/link';
import {
  Skeleton,
  Avatar,
  Button,
  Divider,
  Text,
  TextInput,
  Textarea,
  Group,
  Stack,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconAt, IconMail } from '@tabler/icons-react';

const SettingsPrivacyLoading = () => {
  return (
    <>
      <Skeleton className="skeleton" height={40} maw={70} radius="xl" />
      <Divider my={20} />
      <Stack gap="lg">
        <Skeleton className="skeleton" height={40} maw={150} radius="xl" />
        <Skeleton className="skeleton" height={80} radius="xl" />

        <Divider />

        <Skeleton className="skeleton" height={40} maw={150} radius="xl" />
        <Skeleton className="skeleton" height={60} radius="xl" />
        <Skeleton className="skeleton" height={60} radius="xl" />
        {/*         
        <Divider />

        <Skeleton className="skeleton" height={40} maw={150} radius="xl" />
        <Skeleton className="skeleton" height={60} radius="xl" />
        <Skeleton className="skeleton" height={60} radius="xl" />
        <Skeleton className="skeleton" height={60} radius="xl" /> */}
      </Stack>
    </>
  );
};

export default SettingsPrivacyLoading;
