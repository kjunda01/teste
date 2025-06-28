import admin from "../configs/firebaseAdmin.js";

async function authMiddleware(req, res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token de autenticação ausente ou inválido." });
  }

  const idToken = authorizationHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // agora o req.user tem os dados do usuário autenticado
    next();
  } catch (error) {
    console.error("Erro ao verificar token de autenticação:", error);
    return res.status(401).json({ error: "Falha na autenticação." });
  }
}

export default authMiddleware;
