import getUserByEmailService from "../../services/auth/getUserByEmailService.js";
import signInWithPasswordService from "../../services/auth/signInWithPasswordService.js";

// Método para realizar signInWithPassword
const signInWithPasswordController = async(req, res) => {
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

export default signInWithPasswordController;
