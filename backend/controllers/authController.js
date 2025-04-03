// authController.js
import { signUpService, signInWithPasswordService, resetPasswordForEmailService } from "../services/authService.js";

// Método para realizar signUp
export const signUpController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // Chama o serviço para realizar o login
    const data = await signUpService(email, password);

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Criação de usuário bem-sucedida!", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};

// Método para realizar signInWithPassword
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

// Método para realizar resetPasswordForEmail
export const resetPasswordForEmailController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ error: "Email obrigatório." });
  }

  try {
    // Chama o serviço para realizar o login
    const data = await resetPasswordForEmailService(email, password);

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Email de resetar senha enviado!", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};

// Método para realizar updateUser
export const updateUserController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // Chama o serviço para realizar o login
    const data = await updateUserService(email, password);

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Atualização de dados de usuário bem-sucedida!", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};
