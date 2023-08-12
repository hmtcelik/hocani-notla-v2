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

const SettingsAccountLoading = () => {
  return (
    <>
      <Skeleton className="skeleton" height={40} maw={70} radius="xl" />
      <Divider my={20} />
      <Stack gap="lg">
        <Skeleton className="skeleton" height={30} maw={100} radius="xl" />
        <Skeleton className="skeleton" height={120} maw={120} radius="50%" />

        <Skeleton className="skeleton" height={20} maw={200} radius="xl" />
        <Skeleton className="skeleton" height={45} radius="xl" />

        <Skeleton className="skeleton" height={20} maw={200} radius="xl" />
        <Skeleton className="skeleton" height={45} radius="xl" />

        <Skeleton className="skeleton" height={20} maw={200} radius="xl" />
        <Skeleton className="skeleton" height={80} radius="xl" />

        {/* <Divider />

        <Skeleton className="skeleton" height={30} maw={100} radius="xl" />

        <Skeleton className="skeleton" height={50} radius="xl" />
        <Skeleton className="skeleton" height={50} radius="xl" /> */}
      </Stack>
    </>
  );
};

export default SettingsAccountLoading;
