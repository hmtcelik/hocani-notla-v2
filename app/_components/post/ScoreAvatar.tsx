import { Text } from '@mantine/core';

interface ScoreProps {
  score: number;
  size?: string | number;
  fz?: number;
}

export default function ScoreAvatar({ score, size, fz }: ScoreProps) {
  let color;
  if (score >= 4) color = '#158000';
  else if (score >= 3 && score < 4) color = '#ffc000';
  else if (score < 3 && score > 0) color = 'red';
  else color = '#afafaf';

  return (
    <Text fz={56} fw={'bolder'} c={color}>
      {score.toFixed(1)}
    </Text>
  );
}
