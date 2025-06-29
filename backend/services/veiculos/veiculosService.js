import bancoDeDados from "../../configs/db.js";

const tabela = "veiculos";
const view = "vw_veiculos"
const viewAsyncSelect = "vw_veiculos_async_select";

// CREATE
const create = async (veiculo) => {
  const query = `
    INSERT INTO ${tabela} (ano, cor, marca, matricula, modelo, placa, tipo, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `;
  const result = await bancoDeDados.query(query, [
    veiculo.ano,
    veiculo.cor,
    veiculo.marca,
    veiculo.matricula,
    veiculo.modelo,
    veiculo.placa,
    veiculo.tipo,
    veiculo.status,
  ]);
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

const update = async (veiculo) => {
  const query = `
    UPDATE ${tabela}
    SET ano = $1,
        cor = $2,
        marca = $3,
        matricula = $4,
        modelo = $5,
        tipo = $6,
        status = $7
    WHERE LOWER(placa) = LOWER($8)
  `;
  const result = await bancoDeDados.query(query, [
    veiculo.ano,
    veiculo.cor,
    veiculo.marca,
    veiculo.matricula,
    veiculo.modelo,
    veiculo.tipo,
    veiculo.status,
    veiculo.placa,
  ]);
  return result.rowCount === 1;
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

export const veiculosService = {
  create,
  readAllTabela,
  readAllView,
  readSingleTabela,
  readSingleView,
  buscarPorTermo,
  update,
  remove,
};
