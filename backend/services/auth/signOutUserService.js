import { auth } from "../../config/firebaseClient.js";
import { signOut } from "firebase/auth";

const signOutUserService = async () => {
  try {
    await signOut(auth);
    return { message: "Logout realizado com sucesso" };
  } catch (error) {
    throw new Error(`Erro ao realizar logout: ${error.message}`);
  }
};

export default signOutUserService;
