import updateUserPasswordService from "../../services/auth/updateUserPasswordService.js";

// Método para realizar signOut
const signOutController = async(req, res) => {
  try {
    // Chama o serviço para realizar o logout
    const data = await updateUserPasswordService();

    // Retorna os dados do usuário autenticado
    res.status(200).json({ message: "Usuário deslogado!" });
  } catch (error) {
    // Trata erros e retorna uma resposta adequada
    res.status(400).json({ error: error.message });
  }
};

export default signOutController;
