import connection from "../../config/db.js";

const tabela = "view_veiculos_proprietarios";

const getSingle = async (placa) => {
  try {
    console.log(placa);
    const { rows, rowCount } = await connection.query(
      `SELECT * FROM ${tabela}
       WHERE placa = $1`,
      [placa]
    );

    if (rowCount === 0) {
      throw new Error("Veículo não encontrado.");
    }

    return rows[0];
  } catch (error) {
    throw new Error("Erro ao buscar veículo.");
  }
};

export const placasService = {
  getSingle,
};
