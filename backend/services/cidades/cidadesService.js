import bancoDeDados from "../../configs/db.js";

const view = "vw_cidades_estados";

// READ ALL VIEW
const readAllView = async () => {
  const query = `SELECT * FROM ${view}`;
  const result = await bancoDeDados.query(query);
  return result.rows;
};

export const cidadesService = {
  readAllView,
};
