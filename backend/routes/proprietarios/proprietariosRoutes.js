import express from "express";
import dotenv from "dotenv";
import { proprietariosController } from "../../controllers/proprietarios/proprietariosController.js";
import { proprietariosMiddleware } from "../../middlewares/proprietarios/proprietariosMiddleware.js";

dotenv.config();

const proprietariosRoutes = express.Router();

// Rota para pegar todos os proprietarios
proprietariosRoutes.get("/", proprietariosController.getAll);

// Rota para pegar os veículos de único proprietario usando matricula
proprietariosRoutes.get("/:matricula/veiculos", proprietariosController.getVeiculosPorMatricula);

// Rota para pegar um único proprietario
proprietariosRoutes.get("/:matricula", proprietariosController.getSingle);

// Rota para criar um novo proprietario
proprietariosRoutes.post("/", proprietariosMiddleware.exists, proprietariosController.create);

// Rota para atualizar proprietario
proprietariosRoutes.put("/", proprietariosController.update);

// Rota para remover proprietario
proprietariosRoutes.delete("/:id", proprietariosController.remove);

export default proprietariosRoutes;
