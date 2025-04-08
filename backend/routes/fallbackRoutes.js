import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.use((req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "Rota não encontrada" });
  }

  const htmlPath = path.join(__dirname, "../public/paginaBackend.html");
  fs.readFile(htmlPath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("Erro ao carregar a página.");
    }

    const frontendUrl = process.env.FRONTEND_URL;
    const html = data.replace(/%%FRONTEND_URL%%/g, frontendUrl);
    res.status(200).send(html);
  });
});

export default router;
