const passwordValidationMiddleware = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "A senha é obrigatória." });
  }

  // Validação de comprimento da senha
  if (password.length < 6) {
    return res.status(400).json({ error: "A senha deve ter pelo menos 6 caracteres." });
  }

  next();
};

export default passwordValidationMiddleware;
