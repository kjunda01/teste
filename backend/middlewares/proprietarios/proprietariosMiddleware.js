import connection from "../../config/db.js";

const tabelaPermitida = ["proprietarios", "veiculos"];
const tabela = "proprietarios";

const exists = async (req, res, next) => {
  const { matricula } = req.body;

  if (!tabelaPermitida.includes(tabela)) {
    throw new Error("Tabela inválida");
  }

  try {
    const { rows } = await connection.query(`SELECT * FROM ${tabela} WHERE matricula = $1`, [matricula]);

    if (!rows) {
      return res.status(404).json({ error: "Proprietário não encontrado na base de dados" });
    }

    // Proprietário existe → prossegue
    next();
  } catch (error) {
    console.error("Erro ao verificar proprietário:", error);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

export const proprietariosMiddleware = {
  exists,
};
