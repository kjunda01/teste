import getUserByEmailService from "../../services/auth/getUserByEmailService.js";
import signUpService from "../../services/auth/signUpService.js";

// Método para realizar signUp
const signUpController = async (req, res) => {
  const { email, password } = req.body;

  // Validação básica dos dados
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  // Validação de formato de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido" });
  }

  // Validação de comprimento da senha
  if (password.length < 6) {
    return res.status(400).json({ message: "A senha deve ter pelo menos 6 caracteres" });
  }

  // Verifica se o usuário já existe
  if (await getUserByEmailService(email)) {
    return res.status(409).json({ message: "Usuário já existe" });
  }

  // Chama o serviço para criar o usuário
  const { data, error } = await signUpService(email, password);

  // Retorna os dados do usuário criado
  if (error) {
    return res.status(500).json({ message: "Erro ao criar usuário" });
  }

  return res.status(201).json({ message: "Usuário criado com sucesso!" });

  // } catch (error) {
  //   // Trata erros e retorna uma resposta adequada
  //   console.log(`first`)
  //   return res.status(500).json({ message: 'Erro interno', error: error.message });

  // }
};

export default signUpController;
