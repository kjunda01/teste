import getUserByEmailService from "../../services/auth/getUserByEmailService.js";

const userExistsMiddleware = async (req, res, next) => {
  const { email } = req.body;

  // se o usuário nao existir ele retorna erro
  if (!(await getUserByEmailService(email))) {
    return res.status(400).json({ message: "E-mail não existe na base de dados!" });
  }

  next();
};

export default userExistsMiddleware;
