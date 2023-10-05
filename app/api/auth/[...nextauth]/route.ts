import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import initFirebase from '@/app/_services/InitService';

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
              case 'auth/user-disabled':
                errorMsg = 'Bu kullanıcı banlanmıştır';
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
              case 'auth/internal-error':
                errorMsg = 'Bir hata oluştu';
                break;
              case 'auth/invalid-credential':
                errorMsg = 'Geçersiz kimlik bilgisi';
                break;
              default:
                errorMsg = 'Bir hata oluştu';
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
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
