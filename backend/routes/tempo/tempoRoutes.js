import bancoDeDados from "../../configs/db.js";

const tempoRoutes = async (req, res) => {
  try {
    // Executando uma consulta simples para pegar a hora atual do banco
    const result = await bancoDeDados.query("SELECT NOW()");
    res.json({
      tempo: result.rows[0].now,
    });
  } catch (err) {
    console.error("Erro ao conectar ao banco:", err);
    res.status(500).json({ error: "Erro na conexão com o banco de dados" });
  }
};

export default tempoRoutes;
