import connection from "../config/db.js";

const tabela = "veiculos";
const view = "vw_municipios_completo";

const getAll = async () => {
  try {
    const { rows } = await connection.query(`SELECT * FROM ${view} LIMIT 50`);
    return rows;
  } catch (error) {
    throw new Error("Erro ao buscar municípios.");
  }
};

export const municipiosService = {
  getAll,
};
