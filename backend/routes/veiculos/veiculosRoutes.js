import express from "express";
import dotenv from "dotenv";
import { veiculosController } from "../../controllers/veiculos/veiculosController.js";
import { veiculosMiddleware } from "../../middlewares/veiculos/veiculosMiddleware.js";
import { proprietariosMiddleware } from "../../middlewares/proprietarios/proprietariosMiddleware.js";

dotenv.config();

const veiculosRoutes = express.Router();

// Rota para pegar todos os veículos
veiculosRoutes.get("/", veiculosController.getAll);

// Rota para pegar um único veículo
veiculosRoutes.get("/:id", veiculosMiddleware.existsById, veiculosController.getSingle);

// Rota para criar um novo veículo
veiculosRoutes.post("/", proprietariosMiddleware.exists, veiculosMiddleware.existsByPlaca, veiculosController.create);

// Rota para atualizar veículo
veiculosRoutes.put("/", veiculosController.update);

// Rota para remover veículo
veiculosRoutes.delete("/:id", veiculosController.remove);

export default veiculosRoutes;
