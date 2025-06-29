import bancoDeDados from "../../configs/db.js";

const tabela = "ultimos_veiculos";
const view = "vw_ultimos_veiculos";
const viewAsyncSelect = "vw_ultimos_veiculos_async_select";

// CREATE
const create = async (placa) => {
  const query = `
    INSERT INTO ${tabela} (placa)
    VALUES ($1)
  `;
  const result = await bancoDeDados.query(query, [placa]);
  return result.rowCount === 1;
};

// READ ALL TABELA
const readAllTabela = async () => {
  const query = `SELECT * FROM ${tabela}`;
  const result = await bancoDeDados.query(query);
  return result.rows;
};

// READ ALL VIEW
const readAllView = async () => {
  const query = `SELECT * FROM ${view}`;
  const result = await bancoDeDados.query(query);
  return result.rows;
};

// READ SINGLE TABELA
const readSingleTabela = async (placa) => {
  const query = `SELECT * FROM ${tabela} WHERE LOWER(placa) = LOWER($1)`;
  const result = await bancoDeDados.query(query, [placa]);
  return result.rows;
};

// READ SINGLE VIEW
const readSingleView = async (placa) => {
  const query = `SELECT * FROM ${view} WHERE LOWER(placa) = LOWER($1)`;
  const result = await bancoDeDados.query(query, [placa]);
  return result.rows;
};

// DELETE
const remove = async (placa) => {
  const query = `DELETE FROM ${tabela} WHERE LOWER(placa) = LOWER($1)`;
  const result = await bancoDeDados.query(query, [placa]);
  return result.rowCount === 1;
};

const buscarPorTermo = async (termo) => {
  const query = `
    SELECT value, label
    FROM ${viewAsyncSelect}
    WHERE
      placa_busca ILIKE immutable_unaccent($1) OR
      modelo_busca ILIKE immutable_unaccent($1) OR
      cor_busca ILIKE immutable_unaccent($1) OR
      status_busca ILIKE immutable_unaccent($1) OR
      proprietario_busca ILIKE immutable_unaccent($1)
    ORDER BY label
    LIMIT 20;
  `;
  const { rows } = await bancoDeDados.query(query, [`%${termo}%`]);
  return rows;
};

export const ultimosVeiculosService = {
  create,
  readAllTabela,
  readAllView,
  readSingleTabela,
  readSingleView,
  buscarPorTermo,
  remove,
};
