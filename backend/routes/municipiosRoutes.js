import { Router } from "express";
import { municipiosController } from "../controllers/municipiosController.js";

const municipiosRoutes = Router();

municipiosRoutes.get("/", municipiosController.getAll);

export default municipiosRoutes;
