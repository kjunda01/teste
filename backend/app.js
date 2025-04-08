import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import fallbackRoutes from "./routes/fallbackRoutes.js";
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

// Fallback para rotas não-API (como acessos indevidos pelo navegador)
// Fallback (HTML ou JSON)
app.use(fallbackRoutes);

export default app;
