import { Router } from "express";

import cacheMiddleware from "../../middlewares/cache/cacheMiddleware.js";
import { cidadesController } from "../../controllers/cidades/cidadesController.js";

const cidadesRoutes = Router();

cidadesRoutes.get("/", cacheMiddleware, cidadesController.readAllView);
cidadesRoutes.get("/busca", cacheMiddleware, cidadesController.buscarPorTermo);

export default cidadesRoutes;
