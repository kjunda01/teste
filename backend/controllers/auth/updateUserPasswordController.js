import updateUserPasswordService from "../../services/auth/updateUserPasswordService.js";

// Método para realizar updateUser
const updateUserPasswordController = async(req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Senha ausente." });
  }
  try {
    await updateUserPasswordService(password);
    res.status(200).json({ message: "Senha redefinida com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default updateUserPasswordController;
