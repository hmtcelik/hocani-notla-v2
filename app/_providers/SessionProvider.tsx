'use client';

import React from 'react';
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

export default function SessionProvider({ children, session }: Props) {
  console.log(session?.user || null);
  return <Provider session={session}>{children}</Provider>;
}
