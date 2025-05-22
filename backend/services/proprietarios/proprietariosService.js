import connection from "../../config/db.js";
import { formatProprietarioValuesWithId, formatProprietarioValues } from "../../utils/formatProprietarioValues.js";

const tabela = "proprietarios";
const tabelaVeiculosPorProprietario = "view_veiculos_proprietarios";

const getAll = async () => {
  try {
    const { rows } = await connection.query(`SELECT * FROM ${tabela}`);
    return rows;
  } catch (error) {
    throw new Error("Erro ao buscar proprietarios.");
  }
};

const getVeiculosPorMatricula = async (matricula) => {
  try {
    const { rows } = await connection.query(`SELECT * FROM ${tabelaVeiculosPorProprietario} WHERE proprietario_matricula = $1`, [
      matricula,
    ]);
    return rows;
  } catch (error) {
    throw new Error("Erro ao buscar veículos do proprietário.");
  }
};

const update = async (proprietario) => {
  const values = formatProprietarioValuesWithId(proprietario);

  try {
    const { rowCount, rows } = await connection.query(
      `UPDATE ${tabela} 
       SET nome = $1, matricula = $2
       WHERE id = $3
       RETURNING *`,
      values
    );

    if (rowCount === 0) {
      throw new Error("Proprietário não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao atualizar proprietário.");
  }
};

const create = async (proprietario) => {
  const values = formatProprietarioValues(proprietario);

  try {
    const { rows } = await connection.query(
      `INSERT INTO ${tabela}
         (nome, matricula)
         VALUES ($1, $2) 
         RETURNING *`,
      values
    );

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao criar proprietário.");
  }
};

const remove = async (id) => {
  try {
    const { rows, rowCount } = await connection.query(
      `DELETE FROM ${tabela}
       WHERE ID = $1 RETURNING *`,
      [id]
    );

    if (rowCount === 0) {
      throw new Error("Proprietário não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao deletar proprietário.");
  }
};

const getSingle = async (matricula) => {
  try {
    const { rows, rowCount } = await connection.query(
      `SELECT * FROM ${tabela}
       WHERE matricula = $1`,
      [matricula]
    );

    if (rowCount === 0) {
      throw new Error("Proprietário não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao buscar proprietário.");
  }
};

export const proprietariosService = {
  getAll,
  create,
  update,
  getSingle,
  getVeiculosPorMatricula,
  remove,
};
