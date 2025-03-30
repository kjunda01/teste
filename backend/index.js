const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Testando o Supabase com uma rota simples
app.get("/api/pessoas", async (req, res) => {
  const { data, error } = await supabase.from("pessoas").select("*");
  if (error) {
    return res.status(500).json({ error });
  }
  res.json(data);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
