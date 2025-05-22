import express from "express";
import dotenv from "dotenv";
import { placasMiddleware } from "../../middlewares/placas/placasMiddleware.js";
import { placasController } from "../../controllers/placas/placasController.js";

dotenv.config();

const placaRoutes = express.Router();

// Rota para pegar todos os veículos
//placaRoutes.get("/", veiculosController.getAll);

// Rota para pegar um único veículo
placaRoutes.get("/:placa", placasMiddleware.placaIsValid, placasController.getSingle);

// Rota para criar um novo veículo
//placaRoutes.post("/", proprietariosMiddleware.exists, placasMiddleware.existsByPlaca, veiculosController.create);

// Rota para atualizar veículo
//placaRoutes.put("/", veiculosController.update);

// Rota para remover veículo
//placaRoutes.delete("/:id", veiculosController.remove);

export default placaRoutes;
