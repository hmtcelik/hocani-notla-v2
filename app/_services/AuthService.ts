import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import initFirebase from './InitService';

initFirebase();
const auth = getAuth();

const signUp = (email: string, password: string) => {
  let errorMsg = '';
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Bu email adresi zaten kullanımda';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Geçersiz email adresi';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Şifre en az 6 karakter olmalıdır';
      } else {
        errorMsg = 'Bir hata oluştu';
      }
      console.log(error.code);
      console.log(error.message);
    });
  return errorMsg;
};

export default { signUp };
