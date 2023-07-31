import { Avatar, Text} from '@mantine/core';

interface ScoreProps{
  score:number
  size?: string | number
  fz?: number
}

export default function ScoreAvatar({score, size, fz}:ScoreProps) {
  return (
    <Avatar size={size || 'md'} color="blue" radius="md">
      <Text fz={fz || 19} fw={'bolder'}>
        {score.toFixed(1)}
      </Text>
    </Avatar>
  );
}
