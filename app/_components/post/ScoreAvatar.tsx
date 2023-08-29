import { Avatar, Text } from '@mantine/core';

interface ScoreProps {
  score: number;
  size?: string | number;
  fz?: number;
}

export default function ScoreAvatar({ score, size, fz }: ScoreProps) {
  let color;
  if (score >= 4) color = '#7ff6c3';
  else if (score >= 3 && score < 4) color = '#fff170';
  else if (score < 3 && score > 0) color = '#ff9c9c';
  else color = '#e4e4e4';

  return (
    <Avatar size={size || 'md'} bg={color || 'blue'} radius={0}>
      <Text fz={fz || 19} fw={'bolder'} c="black">
        {score.toFixed(1)}
      </Text>
    </Avatar>
  );
}
