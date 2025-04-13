import setSessionService from "../../services/auth/setSessionService.js";

// Método para realizar setSession
const setSessionController = async(req, res) => {
  const supabaseRecoverySession = req.body;

  if (!supabaseRecoverySession) {
    return res.status(404).json({ message: "Sessão não encontrada" });
  }

  try {
    await setSessionService(supabaseRecoverySession.access_token, supabaseRecoverySession.refresh_token);
    return res.status(200).json({ message: "Sessao definida" });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Erro ao redefinir sessao." });
  }
};

export default setSessionController;
