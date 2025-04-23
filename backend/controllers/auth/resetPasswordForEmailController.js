import getUserByEmailService from "../../services/auth/getUserByEmailService.js";
import resetPasswordForEmailService from "../../services/auth/resetPasswordForEmailService.js";

// Método para realizar resetPasswordForEmail
const resetPasswordForEmailController = async(req, res) => {
  const { email } = req.body;

  try {
    // Chama o serviço para realizar o resetPasswordForEmail
    const data = await resetPasswordForEmailService(email);

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Email de resetar senha enviado!", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};

export default resetPasswordForEmailController;
