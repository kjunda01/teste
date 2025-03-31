import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de autenticação
app.use('/api/auth', authRoutes);


//app.use(logger); // ✅ Loga todas as requisições
//app.use(errorHandler); // ✅ Captura erros em toda a aplicação
export default app;
