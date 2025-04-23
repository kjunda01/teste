import getUserByEmailService from "../../services/auth/getUserByEmailService.js";
import signInWithPasswordService from "../../services/auth/signInWithPasswordService.js";

// Método para realizar signInWithPassword
const signInWithPasswordController = async(req, res) => {
  const { email, password } = req.body;

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
