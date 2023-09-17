'use client';

import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext<User | null>(null);
const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
