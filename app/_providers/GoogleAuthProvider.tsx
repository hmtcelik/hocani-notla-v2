import { GoogleOAuthProvider } from '@react-oauth/google';

interface GoogleAuthProviderProps {
  children: React.ReactNode;
}

export default function GoogleAuthProvider({
  children,
}: GoogleAuthProviderProps) {
  return <GoogleOAuthProvider clientId="">{children}</GoogleOAuthProvider>;
}
