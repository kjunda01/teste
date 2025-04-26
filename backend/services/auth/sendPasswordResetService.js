import { auth } from "../../config/firebaseClient.js";
import { sendPasswordResetEmail } from "firebase/auth";

const sendPasswordResetService = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: process.env.RESET_REDIRECT_URL, // página do seu frontend (ex: http://localhost:5173/newpassword)
      handleCodeInApp: true
    });
    return { message: "Link de redefinição enviado para o e-mail." };
  } catch (error) {
    throw new Error(`Erro ao enviar e-mail de redefinição: ${error.message}`);
  }
};

export default sendPasswordResetService;
