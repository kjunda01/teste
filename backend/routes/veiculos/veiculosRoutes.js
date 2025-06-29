import express from "express";
import cacheMiddleware from "../../middlewares/cache/cacheMiddleware.js";
import { veiculosController } from "../../controllers/veiculos/veiculosController.js";
import { veiculosMiddleware } from "../../middlewares/veiculos/veiculosMiddleware.js";

const veiculosRoutes = express.Router();

// Rota para pegar todos os veículos
veiculosRoutes.get("/", cacheMiddleware, veiculosController.readAllView);

// Rota para fazer busca no banco
veiculosRoutes.get("/busca", cacheMiddleware, veiculosController.buscarPorTermo);

// Rota para pegar um único veículo
veiculosRoutes.get("/:placa", veiculosMiddleware.verificaPlaca, cacheMiddleware, veiculosController.readSingleView);

// Rota para criar um novo veículo
veiculosRoutes.post("/", veiculosController.create);

// Rota para atualizar veículo
veiculosRoutes.put("/", veiculosMiddleware.verificaPlaca, veiculosController.update);

// Rota para remover veículo
veiculosRoutes.delete("/:placa", veiculosMiddleware.verificaPlaca, veiculosController.remove);

export default veiculosRoutes;
