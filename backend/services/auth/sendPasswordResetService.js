import { auth } from "../../config/firebaseClient.js"; // client para envio do email
import admin from "../../config/firebaseAdmin.js"; // admin para checar usuário
import { sendPasswordResetEmail } from "firebase/auth";

const sendPasswordResetService = async (email) => {
  try {
    // Verifica se o usuário existe
    const userExists = await admin.auth().getUserByEmail(email);

    if (!userExists) {
      throw new Error("Usuário não encontrado.");
    }

    // Se chegou aqui, o usuário existe → manda e-mail de redefinição
    await sendPasswordResetEmail(auth, email, {
      url: process.env.RESET_REDIRECT_URL,
      handleCodeInApp: true,
    });

    return { message: "Link de redefinição enviado para o e-mail." };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      throw new Error("E-mail não encontrado no sistema.");
    }
    throw new Error(`Erro ao enviar e-mail de redefinição: ${error.message}`);
  }
};

export default sendPasswordResetService;
