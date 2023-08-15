import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("user: " + user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  
  
export default {signUp};