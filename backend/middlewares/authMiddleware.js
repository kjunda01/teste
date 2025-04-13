// middleware/authMiddleware.js
import supabase from "../config/supabaseClient.js";

const authMiddleware = async(req, res, next) => {
  try {
    console.log(req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido ou inválido" });
    }

    const token = authHeader.split(" ")[1];

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ message: "Token inválido ou expirado" });
    }

    if (!user) {
      return res.status(403).json({ message: "403 - Acesso negado" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erro no authMiddleware:", error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default authMiddleware;
