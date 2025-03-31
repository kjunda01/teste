// authController.js
import { signInWithPasswordService } from "../services/authService.js";

// Método para realizar o login
export const signInWithPasswordController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // Chama o serviço para realizar o login
    const data = await signInWithPasswordService(email, password);

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Login bem-sucedido", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};
