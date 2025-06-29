import express from "express";
import cacheMiddleware from "../../middlewares/cache/cacheMiddleware.js";

import { veiculosMiddleware } from "../../middlewares/veiculos/veiculosMiddleware.js";
import { ultimosVeiculosController } from "../../controllers/ultimosVeiculos/ultimosVeiculosController.js";

const ultimosVeiculos = express.Router();

// Rota para pegar todos os veículos
ultimosVeiculos.get("/", ultimosVeiculosController.readAllView);

// Rota para fazer busca no banco
ultimosVeiculos.get("/busca", ultimosVeiculosController.buscarPorTermo);

// Rota para pegar um único veículo
ultimosVeiculos.get("/:placa", veiculosMiddleware.verificaPlaca, cacheMiddleware, ultimosVeiculosController.readSingleView);

// Rota para criar um novo veículo
ultimosVeiculos.post("/", ultimosVeiculosController.create);

// Rota para remover veículo
ultimosVeiculos.delete("/:placa", veiculosMiddleware.verificaPlaca, ultimosVeiculosController.remove);

export default ultimosVeiculos;
