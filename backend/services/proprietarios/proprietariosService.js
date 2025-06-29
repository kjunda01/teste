import bancoDeDados from "../../configs/db.js";

const tabela = "proprietarios";
const view = "vw_proprietarios";

// CREATE
const create = async (proprietario) => {
  const query = `
    INSERT INTO ${tabela} (matricula, nome)
    VALUES ($1, $2)
`;
  const result = await bancoDeDados.query(query, [proprietario.matricula, proprietario.nome]);
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
const readSingleTabela = async (matricula) => {
  const query = `SELECT * FROM ${tabela} WHERE LOWER(matricula) = LOWER($1)`;
  const result = await bancoDeDados.query(query, [matricula]);
  return result.rows;
};

// READ SINGLE VIEW
const readSingleView = async (matricula) => {
  const query = `SELECT * FROM ${view} WHERE LOWER(matricula) = LOWER($1)`;
  const result = await bancoDeDados.query(query, [matricula]);
  return result.rows;
};

const update = async (proprietario) => {
  const query = `
    UPDATE ${tabela}
    SET matricula = $1, nome = $2
    WHERE LOWER(matricula) = LOWER($1)
  `;
  const result = await bancoDeDados.query(query, [proprietario.matricula, proprietario.nome]);
  return result.rowCount === 1;
};

// DELETE
const remove = async (matricula) => {
  const query = `DELETE * FROM ${tabela} WHERE LOWER(matricula) = LOWER($1)`;
  const result = await bancoDeDados.query(query, [matricula]);
  return result.rowCount === 1;
};

const buscarPorTermo = async (termo) => {
  const query = `
   SELECT value, label
   FROM vw_proprietarios_async_select
   WHERE
     nome_busca ILIKE immutable_unaccent($1) OR
     matricula_busca ILIKE immutable_unaccent($1)
   ORDER BY label
   LIMIT 20;
 `;

  const { rows } = await bancoDeDados.query(query, [`%${termo}%`]);
  return rows;
};

export const proprietariosService = {
  create,
  readAllTabela,
  readAllView,
  readSingleTabela,
  readSingleView,
  update,
  remove,
  buscarPorTermo,
};
