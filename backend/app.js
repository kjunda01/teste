import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import fallbackRoutes from "./routes/fallbackRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// ✅ Loga todas as requisições
app.use(logger);

// ✅ Captura erros em toda a aplicação
// app.use(errorHandler);

// Rotas de autenticação
app.use("/api/auth", authRoutes);

// Fallback para rotas não-API (como acessos indevidos pelo navegador)
app.use(fallbackRoutes);

export default app;
