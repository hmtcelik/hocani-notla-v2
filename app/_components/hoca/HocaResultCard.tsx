import { Group, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import ScoreAvatar from '../post/ScoreAvatar';
import Link from 'next/link';

interface HocaResultCardProps {
  score: number;
  name: string;
  university: string;
  rateCount: number;
}

const HocaResultCard = ({
  score,
  name,
  university,
  rateCount,
}: HocaResultCardProps) => {
  return (
    <Link
      href="#"
      style={{
        textDecoration: 'none',
      }}
    >
      <Group p={30} bg="#f7f7f7" gap={30} align="flex-start">
        <Stack gap={6} align="center">
          <ScoreAvatar score={score} size={70} fz={32} />
          <Text fz={14} c="#4e4e4e">
            {rateCount} Not
          </Text>
        </Stack>
        <Stack gap={5} justify="space-between">
          <Title order={3} fw={900}>
            {name}
          </Title>
          <Text fz={14} c="#4e4e4e">
            {university}
          </Text>
        </Stack>
      </Group>
    </Link>
  );
};

export default HocaResultCard;