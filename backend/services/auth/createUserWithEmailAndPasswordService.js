// src/services/auth/createUserWithEmailAndPasswordService.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseClient.js";

const createUserWithEmailAndPasswordService = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createUserWithEmailAndPasswordService;
