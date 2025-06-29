import express from "express";
import cacheMiddleware from "../../middlewares/cache/cacheMiddleware.js";
import { proprietariosController } from "../../controllers/proprietarios/proprietariosController.js";
import { proprietariosMiddleware } from "../../middlewares/proprietarios/proprietariosMiddleware.js";

const proprietariosRoutes = express.Router();

// Rota para pegar todos os proprietarios
proprietariosRoutes.get("/", cacheMiddleware, proprietariosController.readAllView);

// Rota para fazer busca no banco
proprietariosRoutes.get("/busca", cacheMiddleware, proprietariosController.buscarPorTermo);

// Rota para pegar um único proprietario
proprietariosRoutes.get(
  "/:matricula",
  proprietariosMiddleware.verificaMatricula,
  cacheMiddleware,
  proprietariosController.readSingleView
);

// Rota para criar um novo proprietario
proprietariosRoutes.post("/", proprietariosController.create);

// Rota para atualizar proprietario
proprietariosRoutes.put("/", proprietariosController.update);

// Rota para remover proprietario
proprietariosRoutes.delete("/:matricula", proprietariosMiddleware.verificaMatricula, proprietariosController.remove);

export default proprietariosRoutes;
