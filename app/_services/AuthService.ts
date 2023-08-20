import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import initFirebase from '../_services/InitService';

initFirebase();

const logout = (): Promise<string> => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve('Çıkış Başarılı');
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const signUp = (email: string, password: string): Promise<string> => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve('Kayıt Başarılı');
      })
      .catch((error) => {
        let errorMsg = '';
        if (error.code === 'auth/email-already-in-use') {
          errorMsg = 'Bu email adresi zaten kullanımda';
        } else if (error.code === 'auth/invalid-email') {
          errorMsg = 'Geçersiz email adresi';
        } else if (error.code === 'auth/weak-password') {
          errorMsg = 'Şifre en az 6 karakter olmalıdır';
        } else {
          errorMsg = 'Bir hata oluştu';
        }
        reject(errorMsg);
      });
  });
};

const signIn = (email: string, password: string): Promise<string> => {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve('Giriş Başarılı');
      })
      .catch((error) => {
        let errorMsg = '';
        if (error.code === 'auth/invalid-email') {
          errorMsg = 'Geçersiz email adresi';
        } else if (error.code === 'auth/user-disabled') {
          errorMsg = 'Bu kullanıcı banlanmıştır';
        } else if (error.code === 'auth/user-not-found') {
          errorMsg = 'Bu email adresi ile kayıtlı kullanıcı bulunmamaktadır';
        } else if (error.code === 'auth/wrong-password') {
          errorMsg = 'Şifre yanlış';
        } else {
          errorMsg = 'Bir hata oluştu';
        }
        reject(errorMsg);
        console.log('error :>> ', error);
      });
  });
};

export default { signUp, signIn, logout };
