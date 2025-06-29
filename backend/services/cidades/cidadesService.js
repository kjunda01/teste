import bancoDeDados from "../../configs/db.js";

const view = "vw_cidades_estados";

// READ ALL VIEW
const readAllView = async () => {
  const query = `SELECT * FROM ${view}`;
  const result = await bancoDeDados.query(query);
  return result.rows;
};

const buscarPorTermo = async (termo) => {
  const query = `
   SELECT value, label
   FROM vw_cidades_async_select
   WHERE
     nome_busca ILIKE immutable_unaccent($1) OR
     sigla_busca ILIKE immutable_unaccent($1)
   ORDER BY label
   LIMIT 20;
 `;

  const { rows } = await bancoDeDados.query(query, [`%${termo}%`]);
  return rows;
};

export const cidadesService = {
  readAllView,
  buscarPorTermo,
};
