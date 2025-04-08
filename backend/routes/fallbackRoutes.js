import express from "express";
import { gerarPaginaHTML } from "../config/PaginaBackEnd.js";

const router = express.Router();

// Middleware final para rotas não-API
router.use(async (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "Rota não encontrada" });
  }

  const html = await gerarPaginaHTML("acesso", {
    FRONTEND_URL: process.env.FRONTEND_URL,
  });

  res.status(400).send(html);
});

export default router;
