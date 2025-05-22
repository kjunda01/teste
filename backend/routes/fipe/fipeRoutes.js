import express from "express";
import dotenv from "dotenv";
import { fipeController } from "../../controllers/fipe/fipeController.js";

dotenv.config();

const fipeRoutes = express.Router();

// Rota para obterMarcas
fipeRoutes.post("/:codigoTipoVeiculo", fipeController.obterMarcas);

// Rota para obterModelos
fipeRoutes.post("/:codigoTipoVeiculo/:codigoMarca", fipeController.obterModelos);

// Rota para obterAnos
fipeRoutes.post("/:codigoTipoVeiculo/:codigoMarca/:codigoModelo", fipeController.obterAnos);

export default fipeRoutes;
