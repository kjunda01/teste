import {
  signUpService,
  signInWithPasswordService,
  resetPasswordForEmailService,
  getUserByEmailService,
  signOutService,
  updateUserPasswordService,
  setSessionService,
} from "../services/authService.js";

// Método para realizar signUp
export const signUpController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  // Verifica se o usuário já existe
  if (await getUserByEmailService(email)) {
    return res.status(409).json({ message: "Usuário já existe" });
  }

  // Chama o serviço para criar o usuário
  const { data, error } = await signUpService(email, password);

  // Retorna os dados do usuário criado
  if (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao criar usuário", error });
  }

  return res.status(201).json({ message: "Usuário criado com sucesso!", data });

  // } catch (error) {
  //   // Trata erros e retorna uma resposta adequada
  //   console.log(`first`)
  //   return res.status(500).json({ message: 'Erro interno', error: error.message });

  // }
};

// Método para realizar signInWithPassword
export const signInWithPasswordController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  // se o usuário nao existir ele retorna erro
  if (!(await getUserByEmailService(email))) {
    return res.status(400).json({ message: "E-mail não existe na base de dados!" });
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
  const { email } = req.body;

  // // Validação básica dos dados
  if (!email) {
    return res.status(400).json({ message: "Email obrigatório." });
  }

  // se o usuário nao existir ele retorna erro
  if (!(await getUserByEmailService(email))) {
    return res.status(400).json({ message: "E-mail não existe na base de dados!" });
  }

  try {
    // Chama o serviço para realizar o login
    const data = await resetPasswordForEmailService(email);

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
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
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

// Método para realizar updateUser
export const updateUserPasswordController = async (req, res) => {
  try {
    const { password } = req.body;
    const user = req.user;

    if (!password) {
      return res.status(400).json({ message: "Senha ausente." });
    }

    await updateUserPasswordService(password);
    res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Método para realizar signOut
export const signOutController = async (req, res) => {
  try {
    // Chama o serviço para realizar o logout
    const data = await signOutService();

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Usuário deslogado!" });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};

// Método para realizar setSession
export const setSessionController = async (req, res) => {
  const { password, access_token } = req.body;

  if (!password || !access_token) {
    return res.status(400).json({ message: "Dados incompletos." });
  }

  try {
    await redefinePasswordService(password, access_token);
    return res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Erro ao redefinir senha." });
  }
};

export const onAuthStateChangeController = async (req, res) => {

}
