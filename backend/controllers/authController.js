import {
  signUpService,
  signInWithPasswordService,
  resetPasswordForEmailService,
  getUserByEmailService,
} from "../services/authService.js";

// Método para realizar signUp
export const signUpController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  try {
    // Verifica se o usuário já existe
    const userExists = await getUserByEmailService(email); // ✅ Agora está correto

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe!" });
    }

    // Chama o serviço para criar o usuário
    const data = await signUpService(email, password);

    // Retorna os dados do usuário criado
    res.status(201).json({ message: "Usuário criado com sucesso!", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(500).json({ error: error.message });
  }
};

// Método para realizar signInWithPassword
export const signInWithPasswordController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  if (getUserByEmailService(email)) {
    return res.status(400).json({error: "E-mail não existe na base de dados!"})
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
