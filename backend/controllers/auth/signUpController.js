
import signUpService from "../../services/auth/signUpService.js";

// Método para realizar signUp
const signUpController = async (req, res) => {
  const { email, password } = req.body;

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
