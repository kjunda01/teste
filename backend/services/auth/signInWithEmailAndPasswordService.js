import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebaseClient.js";

const signInWithEmailAndPasswordService = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default signInWithEmailAndPasswordService;
