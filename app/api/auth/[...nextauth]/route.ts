import initFirebase from '@/app/_services/InitService';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth, { Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

initFirebase();

export const authOptions = {
  pages: {
    signIn: '/',
    error: '/',
    signOut: '/',
  },
  secret: process.env.SECRET,
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
            let errorMsg = '';
            switch (error.code) {
              case 'auth/invalid-email':
                errorMsg = 'Geçersiz email adresi';
                break;
              case 'auth/user-not-found':
                errorMsg =
                  'Bu email adresi ile kayıtlı kullanıcı bulunmamaktadır';
                break;
              case 'auth/wrong-password':
                errorMsg = 'Hatalı şifre';
                break;
              case 'auth/too-many-requests':
                errorMsg =
                  'Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyiniz';
                break;
              case 'auth/network-request-failed':
                errorMsg = 'İnternet bağlantınızı kontrol ediniz';
                break;
              case 'auth/invalid-credential':
                errorMsg = 'Geçersiz kimlik bilgisi';
                break;
              default:
                errorMsg = 'Giriş yapılamadı';
            }
            throw new Error(errorMsg);
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
  callbacks: {
    jwt: async ({ token, user }: { token: any; user: User }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: { session: Session; token: any }) => {
      session.user.id = token.user.id;
      session.user.email = token.user.email;
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
