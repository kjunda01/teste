import authRoutes from "./auth/authRoutes.js";
import fipeRoutes from "./fipe/fipeRoutes.js";
import proprietariosRoutes from "./proprietarios/proprietariosRoutes.js";
import veiculosRoutes from "./veiculos/veiculosRoutes.js";
import ultimosVeiculosRoutes from "./ultimosVeiculos/ultimosVeiculosRoutes.js";
import tempoRoutes from "./tempo/tempoRoutes.js";
import fallbackRoutes from "./fallbackRoutes.js";
import cidadesRoutes from "./cidades/cidadesRoutes.js";
import debugRoutes from "./debugRoutes.js";

export const routes = {
  "/api/auth": authRoutes,
  "/fipe": fipeRoutes,
  "/db/cidades": cidadesRoutes,
  "/db/tempo": tempoRoutes, // Teste de conexão com o banco
  "/db/proprietarios": proprietariosRoutes,
  "/db/veiculos": veiculosRoutes,
  "/db/ultimosveiculos": ultimosVeiculosRoutes,
  "/debug": debugRoutes,
  "/": fallbackRoutes, // Fallback para rotas não-API
};
