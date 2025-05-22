import connection from "../../config/db.js";
import { formatVeiculoValuesWithId, formatVeiculoValues } from "../../utils/formatVeiculoValues.js";

const tabela = "veiculos";
const view = "view_veiculos_proprietarios";

const getAll = async () => {
  try {
    const { rows } = await connection.query(`SELECT * FROM ${tabela}`);
    return rows;
  } catch (error) {
    throw new Error("Erro ao buscar veículos.");
  }
};

const update = async (veiculo) => {
  const values = formatVeiculoValuesWithId(veiculo);

  try {
    const { rowCount, rows } = await connection.query(
      `UPDATE ${tabela} 
       SET tipo = $1, marca = $2, modelo = $3, ano = $4, placa = $5, cor = $6, status = $7, matricula_proprietario = $8 , tipo_placa = $9
       WHERE id = $10
       RETURNING *`,
      values
    );

    if (rowCount === 0) {
      throw new Error("Veículo não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao atualizar veículo.");
  }
};

const create = async (veiculo) => {
  const values = formatVeiculoValues(veiculo);

  try {
    const { rows } = await connection.query(
      `INSERT INTO ${tabela}
         (tipo, marca, modelo, ano, placa, cor, status, matricula_proprietario, tipo_placa)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
         RETURNING *`,
      values
    );

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao criar veículo.");
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
      throw new Error("Veículo não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao deletar veículo.");
  }
};

const getSingle = async (id) => {
  try {
    const { rows, rowCount } = await connection.query(
      `SELECT * FROM ${tabela}
       WHERE id = $1`,
      [id]
    );

    if (rowCount === 0) {
      throw new Error("Veículo não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao buscar veículo.");
  }
};

export const veiculosService = {
  getAll,
  create,
  update,
  getSingle,
  remove,
};
