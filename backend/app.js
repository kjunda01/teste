import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(cors());
app.use(express.json());


// ✅ Loga todas as requisições
//app.use(logger);

// ✅ Captura erros em toda a aplicação
// app.use(errorHandler); 

// Rotas de autenticação
app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    // Se é uma rota de API que não existe
    return res.status(404).json({ error: "Rota não encontrada" });
  }
  // Senão, só responde com um aviso ou status
  res.status(400).send("Acesse pelo frontend");
});


export default app;
