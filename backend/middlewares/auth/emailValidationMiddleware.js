const emailValidationMiddleware = (req, res, next) => {
  const { email } = req.body;

  // Validação de formato de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Formato de email inválido" });
  }

  next();
};

export default emailValidationMiddleware;
