// middleware/authMiddleware.js
import supabase from "../config/supabaseClient.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido ou inválido" });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    if (!user) {
      return res.status(403).json({ error: "403 - Acesso negado" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Erro no authMiddleware:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export default authMiddleware;
