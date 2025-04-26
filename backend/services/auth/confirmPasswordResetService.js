import { auth } from "../../config/firebaseClient.js";
import { confirmPasswordReset } from "firebase/auth";

const confirmPasswordResetService = async (oobCode, newPassword) => {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return { message: "Senha redefinida com sucesso." };
  } catch (error) {
    throw new Error(`Erro ao redefinir a senha: ${error.message}`);
  }
};

export default confirmPasswordResetService;
