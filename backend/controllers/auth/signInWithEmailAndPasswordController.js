import signInWithEmailAndPasswordService from "../../services/auth/signInWithEmailAndPasswordService.js";

// Método para realizar signInWithEmailAndPassword
const signInWithEmailAndPasswordController = async(req, res) => {
  const { email, password } = req.body;

  try {
    // Chama o serviço para realizar o login
    const data = await signInWithEmailAndPasswordService(email, password);
    
    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Login bem-sucedido", data });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};

export default signInWithEmailAndPasswordController;
