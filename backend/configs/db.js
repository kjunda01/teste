import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

async function criarPool() {
  return new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT, 10),
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.PG_CERTIFICADO_SSL.replace(/\\n/g, "\n"),
    },
  });
}

const bancoDeDados = await criarPool();

bancoDeDados
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Conectado ao banco de dados supabase com SSL.");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com o banco de dados PostgreSQL:", err);
  });

export default bancoDeDados;
