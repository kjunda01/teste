import supabase from "../config/supabaseClient.js";

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: "Não autorizado" });
  }

  req.user = user; // Adiciona o usuário à requisição para uso nos controladores
  next();
};

export default authMiddleware;
