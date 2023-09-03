import { Avatar, Text } from '@mantine/core';

interface ScoreProps {
  score: number;
  size?: string | number;
  fz?: number;
}

export default function ScoreAvatar({ score, size, fz }: ScoreProps) {
  let color;
  if (score >= 4) color = '#5F8D4E';
  else if (score >= 3 && score < 4) color = '#FFC436';
  else if (score < 3 && score > 0) color = 'red';
  else color = 'gray';

  return (
    <Text fz={56} fw={'bolder'} c={color}>
      {score.toFixed(1)}
    </Text>
  );
}
