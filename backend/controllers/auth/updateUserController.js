import updateUserService from "../../services/auth/updateUserService.js";

// Método para realizar updateUser
const updateUserController = async(req, res) => {
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

export default updateUserController;
