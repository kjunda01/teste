import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(cors());
app.use(express.json());


// ✅ Loga todas as requisições
app.use(logger);

// ✅ Captura erros em toda a aplicação
// app.use(errorHandler); 

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Redireciona qualquer acesso para a url do front
app.get("*", (req, res) => {
  const redirectUrl = `${process.env.FRONTEND_URL}${req.originalUrl}`;
  res.redirect(redirectUrl);
});

export default app;
