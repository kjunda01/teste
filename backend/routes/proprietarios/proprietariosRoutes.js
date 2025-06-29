import express from "express";
import { proprietariosController } from "../../controllers/proprietarios/proprietariosController.js";

const proprietariosRoutes = express.Router();

// Rota para pegar todos os proprietarios
proprietariosRoutes.get("/", proprietariosController.readAllView);

// Rota para pegar um único proprietario
proprietariosRoutes.get("/:matricula", proprietariosController.readSingleView);

// Rota para criar um novo proprietario
proprietariosRoutes.post("/", proprietariosController.create);

// Rota para atualizar proprietario
proprietariosRoutes.put("/", proprietariosController.update);

// Rota para remover proprietario
proprietariosRoutes.delete("/:matricula", proprietariosController.remove);

export default proprietariosRoutes;
