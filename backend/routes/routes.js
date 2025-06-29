import authRoutes from "./auth/authRoutes.js";
import fipeRoutes from "./fipe/fipeRoutes.js";
import proprietariosRoutes from "./proprietarios/proprietariosRoutes.js";
import veiculosRoutes from "./veiculos/veiculosRoutes.js";
import tempoRoutes from "./tempo/tempoRoutes.js";
import fallbackRoutes from "./fallbackRoutes.js";
import cidadesRoutes from "./cidades/cidadesRoutes.js";

export const routes = {
  "/api/auth": authRoutes,
  "/fipe": fipeRoutes,
  "/db/veiculos": veiculosRoutes,
  "/db/proprietarios": proprietariosRoutes,
  "/db/cidades": cidadesRoutes,
  "/db/hora": tempoRoutes, // Teste de conexão com o banco
  "/": fallbackRoutes, // Fallback para rotas não-API
};
