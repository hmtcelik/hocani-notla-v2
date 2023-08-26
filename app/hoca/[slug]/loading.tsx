'use client'

import { Divider, Grid, Skeleton, Stack } from '@mantine/core';

export default function Loadddd() {
  return (
    <>
    <Grid grow>
      <Grid.Col span={{ base: 12, md: 8, lg: 8.8 }}>
        <Skeleton className='skeleton' height={250} radius="xl" />
        <Divider my={20} size={'xs'} />
          <Stack>
            <Skeleton className='skeleton' height={180} radius="xl" />
            <Skeleton className='skeleton' height={180} radius="xl" />
            <Skeleton className='skeleton' height={180} radius="xl" />
          </Stack> 
      </Grid.Col>
      <Grid.Col display={{ base: 'none', md: 'block' }} span={{ base: 12, md: 4, lg: 3.2 }}>
        <Stack style={{ position:'fixed', maxWidth:300, width:'100%' }}>            
            <Skeleton className='skeleton' height={250} radius="xl" />
            <Skeleton className='skeleton' height={250} radius="xl" />
        </Stack>
      </Grid.Col>
    </Grid>
  </>
    )
}