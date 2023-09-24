import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const authOptions = {
  pages: {
    signIn: '/',
    signOut: '/logout',
    error: '/error',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const auth = getAuth();
        const fbUser = await signInWithEmailAndPassword(
          auth,
          credentials.email,
          credentials.password
        )
          .then((res) => {
            return res.user;
          })
          .catch((error) => {
            console.log(error);
            return null;
          });

        if (!fbUser) {
          return null;
        }

        return {
          id: fbUser?.uid,
          email: fbUser.email,
        };
      },
    }),
  ],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
