// import express from "express";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";

// import authRoutes from "./routes/authRoutes.js";
// import fallbackRoutes from "./routes/fallbackRoutes.js";
// import testeRoutes from "./routes/testeRoutes.js";
// import { errorMiddleware } from "./middlewares/errorMiddleware.js";
// import logger from "./middlewares/logger.js";
// import veiculosRoutes from "./routes/veiculos/veiculosRoutes.js";
// import proprietariosRoutes from "./routes/proprietarios/proprietariosRoutes.js";
// import fipeRoutes from "./routes/fipe/fipeRoutes.js";
// import placaRoutes from "./routes/placas/placaRoutes.js";

// // Configura o diretório base para arquivos estáticos
// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const app = express();

// // Configura CORS corretamente
// const allowedOrigins = [
//   process.env.FRONTEND_URL,
//   "http://192.168.1.190:3000",
//   "http://192.168.1.190:5173",
//   "http://localhost:3000",
//   "http://localhost:5173",
//   "http://localhost:5174",
// ];

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Converte o corpo das requisições para JSON
// app.use(express.json());

// // Serve arquivos estáticos da pasta public
// app.use(express.static(path.join(__dirname, "public")));

// // ✅ Loga todas as requisições
// app.use(logger);

// // Definindo as rotas de forma modular
// // Definindo as rotas de forma modular
// const routes = {
//   "/api/auth": authRoutes,
//   "/api/veiculos": veiculosRoutes,
//   "/api/proprietarios": proprietariosRoutes,
//   "/api/placa": placaRoutes,
//   "/api/fipe": fipeRoutes,
//   "/hora": testeRoutes, // Teste de conexão com o banco
//   "/": fallbackRoutes, // Fallback para rotas não-API
// };

// // Configura as rotas a partir do objeto `routes`
// for (const [route, handler] of Object.entries(routes)) {
//   app.use(route, handler);
// }

// // Middleware de erro GLOBAL - DEVE VIR DEPOIS DE TODAS AS ROTAS E MIDDLEWARES
// app.use(errorMiddleware);

// export default app;
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import corsOptions from "./configs/cors.js";
import requestLogger from "./middlewares/log/logger.js";
import fallbackRoutes from "./routes/fallbackRoutes.js";
import { fileURLToPath } from "url";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import { routes } from "./routes/routes.js";
import helmet from "./configs/helmetConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

console.log("Helmet aplicado com config customizada!");
app.use(helmet);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger);

const rotas = routes;
for (const [route, handler] of Object.entries(rotas)) {
  app.use(route, handler);
}

app.use(errorHandler);

app.use(fallbackRoutes);

export default app;
