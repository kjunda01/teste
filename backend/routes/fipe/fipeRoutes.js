import express from "express";
import dotenv from "dotenv";
import { fipeController } from "../../controllers/fipe/fipeController.js";
import cacheMiddleware from "../../middlewares/cache/cacheMiddleware.js";

dotenv.config();

const fipeRoutes = express.Router();

// Rota para obterMarcas
fipeRoutes.post("/:codigoTipoVeiculo", cacheMiddleware, fipeController.obterMarcas);

// Rota para obterModelos
fipeRoutes.post("/:codigoTipoVeiculo/:codigoMarca", cacheMiddleware, fipeController.obterModelos);

// Rota para obterAnos
fipeRoutes.post("/:codigoTipoVeiculo/:codigoMarca/:codigoModelo", cacheMiddleware, fipeController.obterAnos);

export default fipeRoutes;
