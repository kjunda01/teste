import pool from "../config/db.js";

const testeRoutes = async (req, res) => {
  try {
    // Executando uma consulta simples para pegar a hora atual do banco
    const result = await pool.query("SELECT NOW()");
    res.json({
      hora: result.rows[0].now,
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
    res.status(500).json({ error: "Erro na conexão com o banco de dados" });
  }
};

export default testeRoutes;
