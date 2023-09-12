import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestore } from 'firebase-admin';

const authOptions = {
  providers: [],
  adapter: FirestoreAdapter({
    db: firestore(),
  }),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
