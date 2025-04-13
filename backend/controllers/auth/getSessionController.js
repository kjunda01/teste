import getSessionService from "../../services/auth/getSessionService.js";

// Método para realizar getSession
const getSessionController = async(req, res) => {
  const { localStorageSession } = req.body;
  

  if (!localStorageSession) {
    return res.status(404).json({ message: "Sessão não encontrada" });
  }

  try {
    await getSessionService(localStorageSession);
    return res.status(200).json({ message: "Sessao encontrada" });
  } catch (error) {
    console.error(error);
  }
};

export default getSessionController;
