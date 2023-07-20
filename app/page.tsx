'use client'

import { Container } from '@mantine/core';
import { Autocomplete } from '@mantine/core';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState<string[]>([]);

  return (
    <Container size="md" mt={50}>
      <Autocomplete
        label="Your favorite library"
        placeholder="Pick value or enter anything"
        data={[]}
      />
      
    </Container>
)
}
